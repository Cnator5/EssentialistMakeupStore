// // routes/payments.js
// import express from 'express';
// import { client } from '../config/payunit.js';

// const router = express.Router();

// function validatePaymentBody(body) {
//   const { amount, order_id } = body;
//   if (!amount || !order_id) return false;
//   return true;
// }

// // MTN Mobile Money
// router.post('/mtn', async (req, res) => {
//   if (!validatePaymentBody(req.body)) {
//     return res.status(400).json({ error: 'Amount and order_id are required.' });
//   }
//   try {
//     const { amount, phone, order_id, email, name } = req.body;
//     const payment = await client.collections.initiatePayment({
//       total_amount: amount,
//       currency: 'XAF',
//       transaction_id: order_id,
//       return_url: 'https://esmakeupstore.com/return',
//       notify_url: 'https://esmakeupstore.com/webhook',
//       payment_country: 'CM',
//       pay_with: 'CM_MTNMOMO',
//       custom_fields: { order_id, customer_type: 'web', phone },
//     });
//     res.json({ payment_url: payment.transaction_url });
//   } catch (err) {
//     console.error('MTN payment error:', err);
//     res.status(500).json({ error: 'Payment initiation failed' });
//   }
// });

// // Orange Money
// router.post('/orange', async (req, res) => {
//   if (!validatePaymentBody(req.body)) {
//     return res.status(400).json({ error: 'Amount and order_id are required.' });
//   }
//   try {
//     const { amount, phone, order_id, email, name } = req.body;
//     const payment = await client.collections.initiatePayment({
//       total_amount: amount,
//       currency: 'XAF',
//       transaction_id: order_id,
//       return_url: 'https://esmakeupstore.com/return',
//       notify_url: 'https://esmakeupstore.com/webhook',
//       payment_country: 'CM',
//       pay_with: 'CM_ORANGE',
//       custom_fields: { order_id, customer_type: 'web', phone },
//     });
//     res.json({ payment_url: payment.transaction_url });
//   } catch (err) {
//     console.error('Orange payment error:', err);
//     res.status(500).json({ error: 'Payment initiation failed' });
//   }
// });


// export default router;

// import express from 'express';
// import { client } from '../config/payunit.js';

// const router = express.Router();

// // MTN Mobile Money
// router.post('/mtn', async (req, res) => {
//   try {
//     const { amount, phone, order_id, email, name } = req.body;
//     const payment = await client.collections.initiatePayment({
//       total_amount: amount,
//       currency: 'XAF',
//       transaction_id: order_id,
//       return_url: 'https://esmakeupstore.com/return',
//       notify_url: 'https://esmakeupstore.com/webhook',
//       payment_country: 'CM',
//       pay_with: 'CM_MTNMOMO',
//       custom_fields: { order_id, customer_type: 'web' },
//     });
//     res.json({ payment_url: payment.transaction_url });
//   } catch (err) {
//     res.status(500).json({ error: 'Payment initiation failed' });
//   }
// });

// // Orange Money
// router.post('/orange', async (req, res) => {
//   try {
//     const { amount, phone, order_id, email, name } = req.body;
//     const payment = await client.collections.initiatePayment({
//       total_amount: amount,
//       currency: 'XAF',
//       transaction_id: order_id,
//       return_url: 'https://esmakeupstore.com/return',
//       notify_url: 'https://esmakeupstore.com/webhook',
//       payment_country: 'CM',
//       pay_with: 'CM_ORANGE',
//       custom_fields: { order_id, customer_type: 'web' },
//     });
//     res.json({ payment_url: payment.transaction_url });
//   } catch (err) {
//     res.status(500).json({ error: 'Payment initiation failed' });
//   }
// });


// // Guest MTN Mobile Money
// router.post('/guest-mtn', async (req, res) => {
//   try {
//     // Accepts all body fields guest might send
//     const { amount, phone, order_id, email, name } = req.body;
//     // Initiate payment via Payunit
//     const payment = await client.collections.initiatePayment({
//       total_amount: amount,
//       currency: 'XAF',
//       transaction_id: order_id,
//       return_url: 'https://esmakeupstore.com/return',
//       notify_url: 'https://esmakeupstore.com/webhook',
//       payment_country: 'CM',
//       pay_with: 'CM_MTNMOMO',
//       custom_fields: { order_id, customer_type: 'guest' },
//     });
//     res.json({ payment_url: payment.transaction_url });
//   } catch (err) {
//     res.status(500).json({ error: 'Payment initiation failed' });
//   }
// });

// // Guest Orange Money
// router.post('/guest-orange', async (req, res) => {
//   try {
//     const { amount, phone, order_id, email, name } = req.body;
//     const payment = await client.collections.initiatePayment({
//       total_amount: amount,
//       currency: 'XAF',
//       transaction_id: order_id,
//       return_url: 'https://esmakeupstore.com/return',
//       notify_url: 'https://esmakeupstore.com/webhook',
//       payment_country: 'CM',
//       pay_with: 'CM_ORANGE',
//       custom_fields: { order_id, customer_type: 'guest' },
//     });
//     res.json({ payment_url: payment.transaction_url });
//   } catch (err) {
//     res.status(500).json({ error: 'Payment initiation failed' });
//   }
// });

// // Transaction Status
// router.get('/status/:transactionId', async (req, res) => {
//   try {
//     const { transactionId } = req.params;
//     const status = await client.collections.getTransactionStatus(transactionId);
//     res.json(status);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch status' });
//   }
// });

// // Invoice creation
// router.post('/invoice', async (req, res) => {
//   try {
//     const { client_name, client_email, client_phone_number, items, due_date } = req.body;
//     const invoice = await client.invoice.createInvoice({
//       client_name,
//       client_email,
//       client_phone_number,
//       due_date,
//       partial_payment: false,
//       type: 'NORMAL',
//       currency: 'XAF',
//       callback_url: 'https://esmakeupstore.com/callback',
//       items,
//     });
//     res.json(invoice);
//   } catch (err) {
//     res.status(500).json({ error: 'Invoice creation failed' });
//   }
// });

// // Get invoice
// router.get('/invoice/:invoiceId', async (req, res) => {
//   try {
//     const { invoiceId } = req.params;
//     const invoice = await client.invoice.getInvoice(invoiceId);
//     res.json(invoice);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch invoice' });
//   }
// });

// // Disbursement
// router.post('/disburse', async (req, res) => {
//   try {
//     const { account_number, amount, beneficiary_name, account_bank } = req.body;
//     const disbursement = await client.disbursement.createDisbursement({
//       destination_currency: 'XAF',
//       debit_currency: 'XAF',
//       account_number,
//       amount,
//       beneficiary_name,
//       deposit_type: 'MOBILE_MONEY',
//       transaction_id: `DISB_${Date.now()}`,
//       country: 'CM',
//       account_bank,
//     });
//     res.json(disbursement);
//   } catch (err) {
//     res.status(500).json({ error: 'Disbursement failed' });
//   }
// });

// export default router;



import express from "express";
import { client } from "../config/payunit.js";
import { paymentsLimiter } from "../middleware/rateLimiter.js";
import { requireIdempotencyKey } from "../middleware/idempotency.js";

const router = express.Router();

function validatePaymentBody(body) {
  const { amount, order_id, phone } = body;
  return (
    Number(amount) > 0 &&
    typeof order_id === "string" &&
    order_id.trim().length > 0 &&
    typeof phone === "string" &&
    phone.trim().length > 0
  );
}

async function initiatePayunitPayment({
  paymentChannel,
  body,
  customerType,
}) {
  const {
    amount,
    phone,
    order_id,
    email,
    name,
    notify_url = "https://esmakeupstore.com/webhook",
    return_url = "https://esmakeupstore.com/return",
  } = body;

  return client.collections.initiatePayment({
    total_amount: amount,
    currency: "XAF",
    transaction_id: order_id,
    return_url,
    notify_url,
    payment_country: "CM",
    pay_with: paymentChannel,
    custom_fields: {
      order_id,
      customer_type: customerType,
      phone,
      email,
      name,
    },
  });
}

async function handlePaymentRequest(req, res, channel, customerType) {
  if (!validatePaymentBody(req.body)) {
    return res.status(400).json({
      error: "amount, order_id and phone are required.",
    });
  }

  try {
    const payment = await initiatePayunitPayment({
      paymentChannel: channel,
      body: req.body,
      customerType,
    });
    return res.json({ payment_url: payment.transaction_url });
  } catch (err) {
    console.error(`[Payunit:${channel}]`, err);
    return res.status(500).json({ error: "Payment initiation failed" });
  }
}

router.post(
  "/mtn",
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-mtn" }),
  (req, res) => handlePaymentRequest(req, res, "CM_MTNMOMO", "web")
);

router.post(
  "/orange",
  paymentsLimiter,
  requireIdempotencyKey({ prefix: "payunit-orange" }),
  (req, res) => handlePaymentRequest(req, res, "CM_ORANGE", "web")
);

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