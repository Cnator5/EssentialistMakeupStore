import express from "express";
import mongoose from "mongoose";
import { client } from "../config/payunit.js";
import { paymentsLimiter } from "../middleware/rateLimiter.js";
import { requireIdempotencyKey } from "../middleware/idempotency.js";
import auth from "../middleware/auth.js";
import AddressModel from "../models/address.model.js";
import OrderModel from "../models/order.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";
import {
  ensureIntegrityProof,
  formatOrderForClient,
  sanitizeGuestAddress,
  sanitizeGuestContact,
  resolveGuestOrderProducts,
  buildInitialDeliveryTimeline,
  getTimelineActor,
  ORDER_DEFAULT_CURRENCY,
} from "../controllers/order.controller.js";
import {
  sendPayunitPaymentNotification,
  sendOrderNotificationToAdmin,
  sendOrderNotificationToCustomer,
} from "../utils/mail.js";

const router = express.Router();

const stripTrailingSlash = (value = "") =>
  value.toString().trim().replace(/\/+$/, "");

const FRONTEND_URL = stripTrailingSlash(
  process.env.FRONTEND_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://esmakeupstore.com"
);

const BACKEND_URL = stripTrailingSlash(
  process.env.BACKEND_URL || process.env.API_URL || "https://esmakeupstore.com"
);

const ORDER_CURRENCY =
  ORDER_DEFAULT_CURRENCY && ORDER_DEFAULT_CURRENCY.length
    ? ORDER_DEFAULT_CURRENCY
    : "XAF";

const PAYUNIT_CHANNEL_LABEL = {
  CM_MTNMOMO: "MTN Mobile Money",
  CM_ORANGE: "Orange Money",
};

function getChannelLabel(code) {
  return PAYUNIT_CHANNEL_LABEL[code] ?? "Payunit";
}

function generateOrderId(customerType) {
  const prefix = customerType === "guest" ? "GUEST" : "ORD";
  return `${prefix}-${new mongoose.Types.ObjectId()}`;
}

function buildReturnUrl(orderId, integrityToken, text = "Payment") {
  const params = new URLSearchParams({ orderId, text });
  if (integrityToken) {
    params.set("token", integrityToken);
  }
  return `${FRONTEND_URL}/success?${params.toString()}`;
}

function validationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function validatePaymentBody(body = {}) {
  const { amount, list_items } = body;
  return (
    Number(amount) > 0 &&
    Array.isArray(list_items) &&
    list_items.length > 0
  );
}

async function initiatePayunitPayment({
  paymentChannel,
  body,
  customerType,
  notifyUrlOverride,
  returnUrlOverride,
  customFields = {},
}) {
  const {
    amount,
    phone,
    order_id,
    email,
    name,
    notify_url = `${BACKEND_URL}/api/payments/webhook`,
    return_url = `${FRONTEND_URL}/success`,
  } = body;

  if (!phone || !String(phone).trim().length) {
    throw validationError("A valid mobile number is required for Payunit payments.");
  }

  return client.collections.initiatePayment({
    total_amount: amount,
    currency: "XAF",
    transaction_id: order_id,
    return_url: returnUrlOverride ?? return_url,
    notify_url: notifyUrlOverride ?? notify_url,
    payment_country: "CM",
    pay_with: paymentChannel,
    custom_fields: {
      order_id,
      customer_type: customerType,
      phone,
      email,
      name,
      ...customFields,
    },
  });
}

async function createPendingPayunitOrder({
  req,
  channelCode,
  customerType,
}) {
  const body = req.body ?? {};
  const isGuest = customerType === "guest";
  const listItems = Array.isArray(body.list_items) ? body.list_items : [];
  if (!listItems.length) {
    throw validationError("Provide at least one cart item.");
  }

  const requestedOrderId =
    typeof body.order_id === "string" && body.order_id.trim().length >= 6
      ? body.order_id.trim()
      : null;
  const orderId = requestedOrderId ?? generateOrderId(isGuest ? "GUEST" : "ORD");
  const channelLabel = getChannelLabel(channelCode);
  const baseMetadata =
    body.metadata && typeof body.metadata === "object" ? body.metadata : {};

  let orderPayload = null;

  if (isGuest) {
    const contactInfoBase = sanitizeGuestContact(body);
    if (!contactInfoBase.customer_email) {
      throw validationError("Guest email address is required.");
    }

    const sanitizedAddress = sanitizeGuestAddress(body);
    const contactInfo = {
      ...contactInfoBase,
      address_snapshot: sanitizedAddress,
    };

    const products = await resolveGuestOrderProducts(listItems);
    const totalQuantity = products.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0,
    );
    const computedTotal = products.reduce(
      (sum, item) => sum + (Number(item.total) || 0),
      0,
    );

    orderPayload = {
      orderId,
      products,
      paymentId: "",
      payment_status: "PENDING",
      paymentMethod: channelLabel,
      delivery_address: null,
      contact_info: contactInfo,
      subTotalAmt: Number(body.subTotalAmt ?? computedTotal),
      totalAmt: Number(body.totalAmt ?? computedTotal),
      totalQuantity,
      currency: ORDER_CURRENCY,
      is_guest: true,
      metadata: {
        ...baseMetadata,
        guest_delivery_address: sanitizedAddress,
        payload_autoTaggedGuest: true,
        payunit: {
          provider: "Payunit",
          channel: channelCode,
          channelLabel,
          transactionId: null,
          status: "PENDING",
          initiatedAt: new Date(),
          customerType,
          amount: Number(body.totalAmt ?? computedTotal),
          currency: ORDER_CURRENCY,
        },
      },
      fulfillment_status: "Processing",
      deliveryTimeline: buildInitialDeliveryTimeline({
        note: `Order initiated via ${channelLabel}`,
      }),
    };
  } else {
    const addressId = body.addressId ?? body.delivery_address ?? null;
    if (!addressId) {
      throw validationError("Delivery address is required for authenticated payments.");
    }

    const addressDoc = await AddressModel.findById(addressId).lean();
    if (!addressDoc) {
      throw validationError(
        "Delivery address not found. Please refresh your addresses and try again."
      );
    }

    const products = listItems.map((el, index) => {
      const productDoc = el.productId ?? el.product ?? null;
      if (!productDoc || !productDoc._id) {
        throw validationError(
          `Cart item #${index + 1} is missing product details. Please refresh your cart.`
        );
      }
      return {
        productId: productDoc._id,
        product_details: {
          name: productDoc.name,
          image: productDoc.image,
          sku: productDoc.sku ?? productDoc.productCode ?? undefined,
          price: productDoc.price,
        },
        quantity: el.quantity ?? 1,
        price: productDoc.price,
        total: productDoc.price * (el.quantity ?? 1),
        discount: productDoc.discount ?? 0,
      };
    });

    const totalQuantity = products.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0,
    );
    const computedTotal = products.reduce(
      (sum, item) => sum + (item.total || 0),
      0,
    );

    orderPayload = {
      userId: req.userId,
      orderId,
      products,
      paymentId: "",
      payment_status: "PENDING",
      paymentMethod: channelLabel,
      delivery_address: addressDoc._id,
      contact_info: {
        name: addressDoc?.name ?? "",
        customer_email: addressDoc?.customer_email ?? "",
        mobile: addressDoc?.mobile ?? "",
      },
      subTotalAmt: Number(body.subTotalAmt ?? computedTotal),
      totalAmt: Number(body.totalAmt ?? computedTotal),
      totalQuantity,
      currency: ORDER_CURRENCY,
      is_guest: false,
      metadata: {
        ...baseMetadata,
        payunit: {
          provider: "Payunit",
          channel: channelCode,
          channelLabel,
          transactionId: null,
          status: "PENDING",
          initiatedAt: new Date(),
          customerType,
          amount: Number(body.totalAmt ?? computedTotal),
          currency: ORDER_CURRENCY,
        },
      },
      fulfillment_status: "Processing",
      deliveryTimeline: buildInitialDeliveryTimeline({
        note: `Order initiated via ${channelLabel}`,
        updatedBy: getTimelineActor(req.userId),
      }),
    };
  }

  const createdOrder = await OrderModel.create(orderPayload);
  const hydratedOrder = await OrderModel.findById(createdOrder._id)
    .populate("delivery_address")
    .lean();

  const orderWithProof = await ensureIntegrityProof(hydratedOrder);

  return { orderWithProof, channelLabel, orderId };
}

async function handlePaymentRequest(req, res, channel, customerType) {
  if (!validatePaymentBody(req.body ?? {})) {
    return res.status(400).json({
      error: "amount and list_items are required.",
    });
  }

  let pendingOrder = null;
  let paymentInitialized = false;

  try {
    const { orderWithProof, channelLabel, orderId } =
      await createPendingPayunitOrder({
        req,
        channelCode: channel,
        customerType,
      });

    pendingOrder = orderWithProof;

    const notifyUrl = `${BACKEND_URL}/api/payments/webhook`;
    const returnUrl = buildReturnUrl(orderId, orderWithProof.integrityToken);

    const paymentPayload = {
      ...req.body,
      amount:
        Number(req.body.amount ?? orderWithProof.totalAmt ?? 0) ||
        orderWithProof.totalAmt ||
        orderWithProof.subTotalAmt,
      order_id: orderId,
      phone:
        req.body.phone ??
        orderWithProof.contact_info?.mobile ??
        orderWithProof.contact_info?.phone,
      email:
        req.body.email ??
        orderWithProof.contact_info?.customer_email ??
        orderWithProof.contact_info?.email,
      name:
        req.body.name ??
        orderWithProof.contact_info?.name ??
        (customerType === "guest" ? "Guest Customer" : "Customer"),
    };

    if (!paymentPayload.phone) {
      throw validationError(
        "A valid mobile number is required for Payunit payments."
      );
    }

    const payment = await initiatePayunitPayment({
      paymentChannel: channel,
      body: paymentPayload,
      customerType,
      notifyUrlOverride: notifyUrl,
      returnUrlOverride: returnUrl,
      customFields: {
        order_db_id: orderWithProof._id?.toString?.(),
        order_id: orderId,
        integrity_token: orderWithProof.integrityToken,
        channel_label: channelLabel,
        customer_type: customerType,
        email: paymentPayload.email,
        phone: paymentPayload.phone,
      },
    });

    paymentInitialized = true;

    await OrderModel.updateOne(
      { _id: orderWithProof._id },
      {
        $set: {
          paymentId: payment.transaction_id,
          "metadata.payunit.transactionId": payment.transaction_id,
          "metadata.payunit.payment_url": payment.transaction_url,
          "metadata.payunit.return_url": returnUrl,
          "metadata.payunit.notify_url": notifyUrl,
        },
      }
    );

    return res.json({
      payment_url: payment.transaction_url,
      transaction_id: payment.transaction_id,
      orderId,
      integrityToken: orderWithProof.integrityToken,
      order: formatOrderForClient(orderWithProof),
    });
  } catch (err) {
    console.error(`[Payunit:${channel}]`, err);
    if (pendingOrder?._id && !paymentInitialized) {
      await OrderModel.deleteOne({ _id: pendingOrder._id }).catch((error) =>
        console.error("Failed to cleanup pending Payunit order:", error)
      );
    }
    const statusCode = err.statusCode ?? 500;
    return res.status(statusCode).json({
      error: err.message ?? "Payment initiation failed",
    });
  }
}

// --------------------
// Customer payments
// --------------------
router.post(
  "/mtn",
  auth,
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-mtn" }),
  (req, res) => handlePaymentRequest(req, res, "CM_MTNMOMO", "web")
);

router.post(
  "/orange",
  auth,
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-orange" }),
  (req, res) => handlePaymentRequest(req, res, "CM_ORANGE", "web")
);

// --------------------
// Guest payments
// --------------------
router.post(
  "/guest-mtn",
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-guest-mtn" }),
  (req, res) => handlePaymentRequest(req, res, "CM_MTNMOMO", "guest")
);

router.post(
  "/guest-orange",
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-guest-orange" }),
  (req, res) => handlePaymentRequest(req, res, "CM_ORANGE", "guest")
);

// --------------------
// Payunit webhook
// --------------------
router.post("/webhook", paymentsLimiter, async (req, res) => {
  const payload = req.body ?? {};
  const customFields =
    payload.custom_fields ??
    payload.customFields ??
    payload.data?.custom_fields ??
    payload.data?.customFields ??
    {};

  const transactionId =
    payload.transaction_id ??
    payload.transactionId ??
    payload.txn_id ??
    payload.data?.transaction_id ??
    payload.data?.transactionId ??
    payload.data?.txn_id ??
    null;

  const orderId =
    payload.order_id ??
    payload.orderId ??
    payload.data?.order_id ??
    payload.data?.orderId ??
    customFields.order_id ??
    null;

  let status =
    payload.status ??
    payload.transaction_status ??
    payload.data?.status ??
    payload.data?.transaction_status ??
    null;

  let amount =
    payload.amount ??
    payload.total_amount ??
    payload.data?.amount ??
    payload.data?.total_amount ??
    null;

  let currency = payload.currency ?? payload.data?.currency ?? "XAF";
  let channel =
    payload.pay_with ??
    payload.channel ??
    payload.data?.pay_with ??
    payload.data?.channel ??
    customFields.channel_label ??
    null;

  const customerName =
    payload.name ??
    payload.customer_name ??
    payload.data?.name ??
    payload.data?.customer_name ??
    customFields.name ??
    null;

  const customerEmail =
    payload.email ??
    payload.customer_email ??
    payload.data?.email ??
    payload.data?.customer_email ??
    customFields.email ??
    null;

  const customerPhone =
    payload.phone ??
    payload.mobile ??
    payload.data?.phone ??
    payload.data?.mobile ??
    customFields.phone ??
    null;

  try {
    if (transactionId) {
      const statusResponse = await client.collections.getTransactionStatus(
        transactionId
      );
      const statusPayload = statusResponse?.data ?? statusResponse ?? {};
      status =
        statusPayload.status ??
        statusPayload.transaction_status ??
        status;
      amount =
        amount ??
        statusPayload.amount ??
        statusPayload.total_amount;
      currency = currency ?? statusPayload.currency;
      channel =
        channel ??
        statusPayload.pay_with ??
        statusPayload.channel ??
        customFields.channel_label;
    }
  } catch (error) {
    console.error("[Payunit:webhook status check]", error);
  }

  const normalizedStatus = String(status ?? "").toUpperCase();
  const isSuccess = [
    "SUCCESS",
    "SUCCESSFUL",
    "COMPLETED",
    "PAID",
    "APPROVED",
  ].includes(normalizedStatus);

  if (!orderId) {
    console.warn("[Payunit:webhook] Missing orderId in webhook payload.");
    return res.json({ received: true });
  }

  const orderRecord = await OrderModel.findOne({ orderId })
    .populate("delivery_address")
    .lean();

  if (!orderRecord) {
    console.warn(`[Payunit:webhook] Order ${orderId} not found.`);
    return res.json({ received: true });
  }

  const alreadyPaid =
    String(orderRecord.payment_status).toUpperCase() === "PAID";

  if (!isSuccess) {
    return res.json({ received: true });
  }

  if (alreadyPaid) {
    return res.json({ received: true });
  }

  const channelLabel =
    getChannelLabel(channel) ??
    orderRecord.metadata?.payunit?.channelLabel ??
    "Payunit";

  const metadata = {
    ...(orderRecord.metadata ?? {}),
    payunit: {
      ...(orderRecord.metadata?.payunit ?? {}),
      status: normalizedStatus,
      transactionId,
      lastWebhookAt: new Date(),
      amount: amount ?? orderRecord.metadata?.payunit?.amount,
      currency: currency ?? orderRecord.metadata?.payunit?.currency ?? "XAF",
      channel,
      channelLabel,
      rawWebhook: payload,
    },
  };

  const timelineEntry = {
    status: "Payment Confirmed",
    note: `${channelLabel} payment confirmed${
      transactionId ? ` (Txn ${transactionId})` : ""
    }`,
    timestamp: new Date(),
    updatedBy: getTimelineActor(orderRecord.userId),
  };

  await OrderModel.updateOne(
    { _id: orderRecord._id },
    {
      $set: {
        payment_status: "PAID",
        paymentMethod: channelLabel,
        paymentId: transactionId ?? orderRecord.paymentId,
        totalAmt:
          orderRecord.totalAmt && orderRecord.totalAmt > 0
            ? orderRecord.totalAmt
            : Number(amount ?? orderRecord.totalAmt ?? 0),
        metadata,
      },
      $push: { deliveryTimeline: timelineEntry },
    }
  );

  const refreshed = await OrderModel.findById(orderRecord._id)
    .populate("delivery_address")
    .lean();
  const orderWithProof = await ensureIntegrityProof(refreshed);

  await sendOrderNotificationToAdmin([orderWithProof]);
  await sendOrderNotificationToCustomer(orderWithProof);
  await sendPayunitPaymentNotification({
    orderId: orderWithProof.orderId,
    transactionId,
    amount: amount ?? orderWithProof.totalAmt,
    currency: currency ?? orderWithProof.currency ?? "XAF",
    status: normalizedStatus,
    channel: channelLabel,
    customerName: orderWithProof.contact_info?.name,
    customerEmail: orderWithProof.contact_info?.customer_email,
    customerPhone: orderWithProof.contact_info?.mobile,
  });

  if (orderWithProof.userId) {
    await CartProductModel.deleteMany({ userId: orderWithProof.userId });
    await UserModel.updateOne(
      { _id: orderWithProof.userId },
      { shopping_cart: [] }
    );
  }

  return res.json({ received: true });
});

// --------------------
// Transaction status
// --------------------
router.get(
  "/status/:transactionId",
  paymentsLimiter,
  async (req, res) => {
    try {
      const status = await client.collections.getTransactionStatus(
        req.params.transactionId
      );
      res.json(status);
    } catch (err) {
      console.error("[Payunit:status]", err);
      res.status(500).json({ error: "Failed to fetch status" });
    }
  }
);

// --------------------
// Invoices
// --------------------
router.post(
  "/invoice",
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-invoice" }),
  async (req, res) => {
    try {
      const invoice = await client.invoice.createInvoice({
        ...req.body,
        partial_payment: false,
        type: "NORMAL",
        currency: "XAF",
        callback_url: "https://esmakeupstore.com/callback",
      });
      res.json(invoice);
    } catch (err) {
      console.error("[Payunit:invoice]", err);
      res.status(500).json({ error: "Invoice creation failed" });
    }
  }
);

router.get(
  "/invoice/:invoiceId",
  paymentsLimiter,
  async (req, res) => {
    try {
      const invoice = await client.invoice.getInvoice(req.params.invoiceId);
      res.json(invoice);
    } catch (err) {
      console.error("[Payunit:get invoice]", err);
      res.status(500).json({ error: "Failed to fetch invoice" });
    }
  }
);

// --------------------
// Disbursement (payout)
// --------------------
router.post(
  "/disburse",
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-disburse" }),
  async (req, res) => {
    try {
      const {
        account_number,
        amount,
        beneficiary_name,
        account_bank,
      } = req.body;

      const disbursement = await client.disbursement.createDisbursement({
        destination_currency: "XAF",
        debit_currency: "XAF",
        account_number,
        amount,
        beneficiary_name,
        deposit_type: "MOBILE_MONEY",
        transaction_id: `DISB_${Date.now()}`,
        country: "CM",
        account_bank,
      });

      res.json(disbursement);
    } catch (err) {
      console.error("[Payunit:disburse]", err);
      res.status(500).json({ error: "Disbursement failed" });
    }
  }
);

export default router;