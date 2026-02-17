// // // Updated mail.js with guest order notification support
// // import nodemailer from "nodemailer";
// // import AddressModel from "../models/address.model.js";

// // // Setup the transporter
// // export const transporter = nodemailer.createTransport({
// //   service: "Gmail",
// //   auth: {
// //     user: process.env.ADMIN_EMAIL,
// //     pass: process.env.ADMIN_EMAIL_PASS
// //   }
// // });


// // export async function sendOrderNotificationToAdmin(orderArray) {
// //   for (const order of orderArray) {
// //     // Fetch Address (as before)
// //     let addressObj = order.delivery_address;
// //     let addressText = "N/A";
// //     if (addressObj) {
// //       if (
// //         typeof addressObj === "string" ||
// //         (addressObj._id && !addressObj.address_line)
// //       ) {
// //         try {
// //           addressObj = await AddressModel.findById(
// //             typeof addressObj === "string" ? addressObj : addressObj._id
// //           ).lean();
// //         } catch (err) {
// //           addressObj = null;
// //         }
// //       }
// //       if (addressObj) {
// //         addressText = `
// // ${addressObj.address_line || ""}, 
// // ${addressObj.city || ""}, ${addressObj.state || ""}, 
// // ${addressObj.country || ""} - ${addressObj.pincode || ""}
// // Mobile: ${addressObj.mobile || ""}
// //         `.trim();
// //       }
// //     }

// //     // Customer Info
// //     const customerName =
// //       addressObj?.name ||
// //       order.contact_info?.name ||
// //       "N/A";
// //     const customerEmail = order.contact_info?.customer_email || addressObj?.customer_email || "N/A";
// //     const customerPhone = order.contact_info?.mobile || addressObj?.mobile || "N/A";

// //     // Compose products list (NEW)
// //     let productsText = "";
// //     if (Array.isArray(order.products) && order.products.length > 0) {
// //       productsText = order.products.map((prod, idx) => 
// //         `#${idx+1}
// //   Product: ${prod.product_details.name}
// //   Qty: ${prod.quantity}
// //   Price: ${prod.price}
// //   Images: ${Array.isArray(prod.product_details.image) ? prod.product_details.image.join(", ") : prod.product_details.image}
// //       `.trim()
// //       ).join("\n\n");
// //     } else {
// //       productsText = "N/A";
// //     }

// //     const subject = `${order.is_guest ? '[GUEST] ' : ''}New Order: ${order.orderId}`;
// //     const text = `
// // Order ID: ${order.orderId}
// // Products:
// // ${productsText}
// // Total: ${order.subTotalAmt}
// // Customer Name: ${customerName}
// // Customer Email: ${customerEmail}
// // Customer Phone: ${customerPhone}
// // Customer Address: ${addressText}
// // ${order.is_guest ? 'GUEST ORDER: Yes' : ''}
// //     `.trim();

// //     // Send Email
// //     await transporter.sendMail({
// //       from: `"${customerName}" <${process.env.ADMIN_EMAIL}>`,
// //       to: process.env.ADMIN_RECEIVE_EMAIL,
// //       replyTo: customerEmail !== "N/A" ? customerEmail : undefined,
// //       subject,
// //       text
// //     });
// //   }
// // }












// // backend/utils/mail.js
// import nodemailer from "nodemailer";
// import twilio from "twilio";
// import AddressModel from "../models/address.model.js";

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
// const ADMIN_EMAIL_PASS = process.env.ADMIN_EMAIL_PASS;
// const ADMIN_RECEIVE_EMAIL = process.env.ADMIN_RECEIVE_EMAIL;

// export const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: ADMIN_EMAIL,
//     pass: ADMIN_EMAIL_PASS,
//   },
// });

// const canUseTwilio =
//   Boolean(process.env.TWILIO_ACCOUNT_SID) &&
//   Boolean(process.env.TWILIO_AUTH_TOKEN) &&
//   Boolean(process.env.TWILIO_WHATSAPP_FROM);

// let twilioClient = null;
// if (canUseTwilio) {
//   twilioClient = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );
// }

// function normaliseWhatsAppPhone(phone) {
//   if (!phone) return null;

//   const sanitized = phone.replace(/[^\d+]/g, "");
//   if (!sanitized) return null;

//   if (sanitized.startsWith("+")) {
//     return sanitized;
//   }

//   const defaultCode = process.env.DEFAULT_WHATSAPP_COUNTRY_CODE ?? "";
//   if (defaultCode.startsWith("+")) {
//     return `${defaultCode}${sanitized}`;
//   }
//   if (defaultCode) {
//     return `+${defaultCode}${sanitized}`;
//   }

//   return null;
// }

// async function sendWhatsAppMessage({ to, body }) {
//   if (!twilioClient) {
//     console.info(
//       "sendWhatsAppMessage: Twilio not configured, skipping WhatsApp notification."
//     );
//     return;
//   }

//   const recipient = normaliseWhatsAppPhone(to);
//   if (!recipient) {
//     console.warn(
//       "sendWhatsAppMessage: invalid phone number, skipping WhatsApp notification."
//     );
//     return;
//   }

//   try {
//     await twilioClient.messages.create({
//       from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
//       to: `whatsapp:${recipient}`,
//       body,
//     });
//   } catch (error) {
//     console.error("sendWhatsAppMessage: failed to send WhatsApp message", error);
//   }
// }

// function formatProductsForEmail(products = []) {
//   if (!Array.isArray(products) || !products.length) {
//     return "No products listed.";
//   }

//   return products
//     .map((prod, idx) => {
//       const images = Array.isArray(prod.product_details?.image)
//         ? prod.product_details.image.join(", ")
//         : prod.product_details?.image ?? "N/A";

//       return `#${idx + 1}
//   Product: ${prod.product_details?.name ?? "N/A"}
//   Qty: ${prod.quantity ?? 0}
//   Price: ${prod.price ?? 0}
//   Images: ${images}`.trim();
//     })
//     .join("\n\n");
// }

// function formatAddress(addressObj) {
//   if (!addressObj || typeof addressObj !== "object") return "N/A";

//   return [
//     addressObj.address_line,
//     `${addressObj.city ?? ""}${addressObj.state ? `, ${addressObj.state}` : ""}`,
//     `${addressObj.country ?? ""} ${addressObj.pincode ?? ""}`.trim(),
//     addressObj.mobile ? `Mobile: ${addressObj.mobile}` : null,
//   ]
//     .filter(Boolean)
//     .join("\n");
// }

// export async function sendOrderNotificationToAdmin(orderArray = []) {
//   if (!ADMIN_RECEIVE_EMAIL) {
//     console.warn(
//       "sendOrderNotificationToAdmin: ADMIN_RECEIVE_EMAIL is not set, skipping email notifications."
//     );
//     return;
//   }

//   for (const order of orderArray) {
//     let addressObj = order.delivery_address;
//     if (
//       addressObj &&
//       typeof addressObj === "string" &&
//       addressObj.length >= 12
//     ) {
//       try {
//         addressObj = await AddressModel.findById(addressObj).lean();
//       } catch (error) {
//         console.error(
//           "sendOrderNotificationToAdmin: failed to look up address by id",
//           error
//         );
//         addressObj = null;
//       }
//     }

//     const addressText = formatAddress(addressObj ?? order.delivery_address);
//     const customerName =
//       addressObj?.name ?? order.contact_info?.name ?? "Customer";
//     const customerEmail =
//       order.contact_info?.customer_email ??
//       addressObj?.customer_email ??
//       "N/A";
//     const customerPhone =
//       order.contact_info?.mobile ?? addressObj?.mobile ?? "N/A";

//     const subject = `${
//       order.is_guest ? "[GUEST] " : ""
//     }New Order: ${order.orderId}`;
//     const text = `
// Order ID: ${order.orderId}
// Products:
// ${formatProductsForEmail(order.products)}

// Total: ${order.totalAmt ?? order.subTotalAmt ?? 0}
// Customer Name: ${customerName}
// Customer Email: ${customerEmail}
// Customer Phone: ${customerPhone}
// Customer Address:
// ${addressText}
// ${order.is_guest ? "GUEST ORDER: Yes" : ""}
// `.trim();

//     try {
//       await transporter.sendMail({
//         from: `"${customerName}" <${ADMIN_EMAIL}>`,
//         to: ADMIN_RECEIVE_EMAIL,
//         replyTo: customerEmail !== "N/A" ? customerEmail : undefined,
//         subject,
//         text,
//       });
//     } catch (error) {
//       console.error(
//         "sendOrderNotificationToAdmin: failed to send admin email",
//         error
//       );
//     }
//   }
// }

// export async function sendDeliveryConfirmationNotification(order) {
//   if (!order) return;

//   const customerEmail =
//     order.contact_info?.customer_email ??
//     order.delivery_address?.customer_email ??
//     null;
//   const customerPhone =
//     order.contact_info?.mobile ?? order.delivery_address?.mobile ?? null;
//   const customerName =
//     order.contact_info?.name ??
//     order.delivery_address?.name ??
//     "Valued Customer";
//   const orderId = order.orderId ?? order._id;

//   const emailSubject = `Delivery Confirmation: ${orderId}`;
//   const emailBody = `
// Hi ${customerName},

// Great news! Your order ${orderId} has been successfully delivered.

// If you have any questions or concerns, simply reply to this email or contact support.

// Thank you for shopping with us!
// `.trim();

//   if (customerEmail) {
//     try {
//       await transporter.sendMail({
//         from: `"${process.env.BRAND_NAME ?? "Customer Service"}" <${ADMIN_EMAIL}>`,
//         to: customerEmail,
//         subject: emailSubject,
//         text: emailBody,
//       });
//     } catch (error) {
//       console.error(
//         "sendDeliveryConfirmationNotification: failed to send email",
//         error
//       );
//     }
//   }

//   if (customerPhone) {
//     const whatsappBody = `Hi ${customerName}, your order ${orderId} has just been delivered. Thank you for shopping with us!`;
//     await sendWhatsAppMessage({ to: customerPhone, body: whatsappBody });
//   }
// }





import nodemailer from "nodemailer";
import twilio from "twilio";
import sendEmail from "../config/sendEmail.js";
import AddressModel from "../models/address.model.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_EMAIL_PASS = process.env.ADMIN_EMAIL_PASS;
const ADMIN_RECEIVE_EMAIL = process.env.ADMIN_RECEIVE_EMAIL;
const BRAND_NAME = process.env.BRAND_NAME ?? "Customer Service";

function extractEmailAddress(input) {
  if (!input) return null;
  const match = input.match(/<([^>]+)>/);
  if (match) return match[1];
  if (input.includes("@")) return input;
  return null;
}

const RESEND_SENDER_EMAIL =
  extractEmailAddress(process.env.RESEND_SENDER) ?? "onboarding@resend.dev";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASS,
  },
});

const canUseTwilio =
  Boolean(process.env.TWILIO_ACCOUNT_SID) &&
  Boolean(process.env.TWILIO_AUTH_TOKEN) &&
  Boolean(process.env.TWILIO_WHATSAPP_FROM);

let twilioClient = null;
if (canUseTwilio) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

function normaliseWhatsAppPhone(phone) {
  if (!phone) return null;

  const sanitized = phone.replace(/[^\d+]/g, "");
  if (!sanitized) return null;

  if (sanitized.startsWith("+")) {
    return sanitized;
  }

  const defaultCode = process.env.DEFAULT_WHATSAPP_COUNTRY_CODE ?? "";
  if (defaultCode.startsWith("+")) {
    return `${defaultCode}${sanitized}`;
  }
  if (defaultCode) {
    return `+${defaultCode}${sanitized}`;
  }

  return null;
}

async function sendWhatsAppMessage({ to, body }) {
  if (!twilioClient) {
    console.info(
      "sendWhatsAppMessage: Twilio not configured, skipping WhatsApp notification."
    );
    return;
  }

  const recipient = normaliseWhatsAppPhone(to);
  if (!recipient) {
    console.warn(
      "sendWhatsAppMessage: invalid phone number, skipping WhatsApp notification."
    );
    return;
  }

  try {
    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${recipient}`,
      body,
    });
  } catch (error) {
    console.error("sendWhatsAppMessage: failed to send WhatsApp message", error);
  }
}

async function sendEmailWithFallback({
  to,
  subject,
  text,
  html,
  replyTo,
  fromName,
  fromEmail,
}) {
  const recipients = Array.isArray(to)
    ? to.filter(Boolean)
    : [to].filter(Boolean);

  if (!recipients.length) {
    console.warn("sendEmailWithFallback: no recipients provided");
    return false;
  }

  const resolvedFromName = fromName ?? BRAND_NAME;
  const resolvedFromEmail = fromEmail ?? ADMIN_EMAIL;
  const plainText = text && text.trim().length ? text : undefined;
  const htmlBody =
    html ?? (plainText ? `<pre style="white-space:pre-wrap">${plainText}</pre>` : undefined);

  if (process.env.RESEND_API) {
    const resendFrom = `${resolvedFromName} <${RESEND_SENDER_EMAIL}>`;
    const resendResult = await sendEmail({
      sendTo: recipients,
      subject,
      html: htmlBody,
      text: plainText,
      replyTo,
      from: resendFrom,
    });

    if (resendResult?.success) {
      return true;
    }

    console.warn(
      "sendEmailWithFallback: Resend delivery failed, attempting Nodemailer fallback."
    );
  }

  try {
    await transporter.sendMail({
      from: `"${resolvedFromName}" <${resolvedFromEmail}>`,
      to: recipients,
      subject,
      text: plainText,
      html: htmlBody,
      replyTo,
    });
    return true;
  } catch (error) {
    console.error("sendEmailWithFallback: transporter send failed", error);
    return false;
  }
}

function formatProductsForEmail(products = []) {
  if (!Array.isArray(products) || !products.length) {
    return "No products listed.";
  }

  return products
    .map((prod, idx) => {
      const images = Array.isArray(prod.product_details?.image)
        ? prod.product_details.image.join(", ")
        : prod.product_details?.image ?? "N/A";

      return `#${idx + 1}
  Product: ${prod.product_details?.name ?? "N/A"}
  Qty: ${prod.quantity ?? 0}
  Price: ${prod.price ?? 0}
  Images: ${images}`.trim();
    })
    .join("\n\n");
}

function formatAddress(addressObj) {
  if (!addressObj || typeof addressObj !== "object") return "N/A";

  return [
    addressObj.address_line,
    `${addressObj.city ?? ""}${addressObj.state ? `, ${addressObj.state}` : ""}`,
    `${addressObj.country ?? ""} ${addressObj.pincode ?? ""}`.trim(),
    addressObj.mobile ? `Mobile: ${addressObj.mobile}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

async function resolveAddressObject(order) {
  let addressObj = order?.delivery_address ?? null;
  if (
    addressObj &&
    typeof addressObj === "string" &&
    addressObj.length >= 12
  ) {
    try {
      addressObj = await AddressModel.findById(addressObj).lean();
    } catch (error) {
      console.error(
        "resolveAddressObject: failed to look up address by id",
        error
      );
      addressObj = null;
    }
  }
  return addressObj ?? order?.delivery_address ?? null;
}

function resolveCustomerContact(order, addressObj) {
  const name =
    addressObj?.name ??
    order?.contact_info?.name ??
    order?.customer?.name ??
    "Customer";

  const email =
    order?.contact_info?.customer_email ??
    order?.contact_info?.email ??
    addressObj?.customer_email ??
    order?.customer?.email ??
    null;

  const phone =
    order?.contact_info?.mobile ??
    order?.contact_info?.phone ??
    addressObj?.mobile ??
    order?.customer?.phone ??
    null;

  return { name, email, phone };
}

function formatOrderEmailForCustomer(order, addressObj) {
  const addressText = formatAddress(addressObj ?? order?.delivery_address);
  const paymentStatus =
    order?.payment_status ?? order?.paymentStatus ?? "Processing";
  const paymentMethod =
    order?.paymentMethod ??
    order?.payment_method ??
    (paymentStatus === "CASH ON DELIVERY" ? "Cash on Delivery" : "Online");

  return `
Order ID: ${order?.orderId ?? order?._id ?? "N/A"}
Payment Status: ${paymentStatus}
Payment Method: ${paymentMethod}

Products:
${formatProductsForEmail(order?.products)}

Total: ${order?.totalAmt ?? order?.subTotalAmt ?? 0}

Delivery Address:
${addressText}
`.trim();
}

export async function sendOrderNotificationToAdmin(orderArray = []) {
  if (!ADMIN_RECEIVE_EMAIL) {
    console.warn(
      "sendOrderNotificationToAdmin: ADMIN_RECEIVE_EMAIL is not set, skipping email notifications."
    );
    return;
  }

  for (const order of orderArray) {
    let addressObj = order.delivery_address;
    if (
      addressObj &&
      typeof addressObj === "string" &&
      addressObj.length >= 12
    ) {
      try {
        addressObj = await AddressModel.findById(addressObj).lean();
      } catch (error) {
        console.error(
          "sendOrderNotificationToAdmin: failed to look up address by id",
          error
        );
        addressObj = null;
      }
    }

    const addressText = formatAddress(addressObj ?? order.delivery_address);
    const customerName =
      addressObj?.name ?? order.contact_info?.name ?? "Customer";
    const customerEmail =
      order.contact_info?.customer_email ??
      addressObj?.customer_email ??
      "N/A";
    const customerPhone =
      order.contact_info?.mobile ?? addressObj?.mobile ?? "N/A";

    const subject = `${
      order.is_guest ? "[GUEST] " : ""
    }New Order: ${order.orderId}`;
    const text = `
Order ID: ${order.orderId}
Products:
${formatProductsForEmail(order.products)}

Total: ${order.totalAmt ?? order.subTotalAmt ?? 0}
Customer Name: ${customerName}
Customer Email: ${customerEmail}
Customer Phone: ${customerPhone}
Customer Address:
${addressText}
${order.is_guest ? "GUEST ORDER: Yes" : ""}
`.trim();

    await sendEmailWithFallback({
      to: ADMIN_RECEIVE_EMAIL,
      subject,
      text,
      fromName: customerName,
      fromEmail: ADMIN_EMAIL,
      replyTo: customerEmail !== "N/A" ? customerEmail : undefined,
    });
  }
}

export async function sendOrderNotificationToCustomer(order) {
  if (!order) return;

  const addressObj = await resolveAddressObject(order);
  const { name, email, phone } = resolveCustomerContact(order, addressObj);

  const subject = `Order Confirmation: ${order.orderId ?? order._id ?? ""}`;
  const body = `
Hi ${name},

Thank you for your order! We have received it successfully.

${formatOrderEmailForCustomer(order, addressObj)}

If you have any questions, please reply to this email.

Thank you for shopping with us!
`.trim();

  if (email) {
    await sendEmailWithFallback({
      to: email,
      subject,
      text: body,
      fromName: BRAND_NAME,
      fromEmail: ADMIN_EMAIL,
    });
  }

  if (phone) {
    const whatsappBody = `Hi ${name}, we received your order ${
      order.orderId ?? order._id ?? ""
    }. Total: ${order.totalAmt ?? order.subTotalAmt ?? 0}. Thank you for shopping with us!`;
    await sendWhatsAppMessage({ to: phone, body: whatsappBody });
  }
}

export async function sendPayunitPaymentNotification({
  orderId,
  transactionId,
  amount,
  currency = "XAF",
  status,
  channel,
  customerName,
  customerEmail,
  customerPhone,
} = {}) {
  const resolvedOrderId = orderId ?? transactionId ?? "N/A";
  const resolvedStatus = status ?? "UNKNOWN";
  const channelLabel = channel ?? "Payunit";

  const adminSubject = `Payment ${resolvedStatus}: ${resolvedOrderId}`;
  const adminBody = `
Payment Update (Payunit)

Order ID: ${resolvedOrderId}
Transaction ID: ${transactionId ?? "N/A"}
Status: ${resolvedStatus}
Channel: ${channelLabel}
Amount: ${amount ?? "N/A"} ${currency}

Customer Name: ${customerName ?? "N/A"}
Customer Email: ${customerEmail ?? "N/A"}
Customer Phone: ${customerPhone ?? "N/A"}
`.trim();

  if (ADMIN_RECEIVE_EMAIL) {
    await sendEmailWithFallback({
      to: ADMIN_RECEIVE_EMAIL,
      subject: adminSubject,
      text: adminBody,
      fromName: "Payments Robot",
      fromEmail: ADMIN_EMAIL,
    });
  }

  if (customerEmail) {
    const customerSubject = `Payment ${resolvedStatus}: ${resolvedOrderId}`;
    const customerBody = `
Hi ${customerName ?? "Customer"},

We have received your payment.

Order ID: ${resolvedOrderId}
Status: ${resolvedStatus}
Channel: ${channelLabel}
Amount: ${amount ?? "N/A"} ${currency}

Thank you for shopping with us!
`.trim();

    await sendEmailWithFallback({
      to: customerEmail,
      subject: customerSubject,
      text: customerBody,
      fromName: BRAND_NAME,
      fromEmail: ADMIN_EMAIL,
    });
  }

  if (customerPhone) {
    const whatsappBody = `Hi ${customerName ?? "Customer"}, your payment (${resolvedStatus}) for order ${resolvedOrderId} was received. Amount: ${amount ?? "N/A"} ${currency}. Thank you!`;
    await sendWhatsAppMessage({ to: customerPhone, body: whatsappBody });
  }
}

export async function sendDeliveryConfirmationNotification(order) {
  if (!order) return;

  const customerEmail =
    order.contact_info?.customer_email ??
    order.delivery_address?.customer_email ??
    null;
  const customerPhone =
    order.contact_info?.mobile ?? order.delivery_address?.mobile ?? null;
  const customerName =
    order.contact_info?.name ??
    order.delivery_address?.name ??
    "Valued Customer";
  const orderId = order.orderId ?? order._id;

  const emailSubject = `Delivery Confirmation: ${orderId}`;
  const emailBody = `
Hi ${customerName},

Great news! Your order ${orderId} has been successfully delivered.

If you have any questions or concerns, simply reply to this email or contact support.

Thank you for shopping with us!
`.trim();

  if (customerEmail) {
    await sendEmailWithFallback({
      to: customerEmail,
      subject: emailSubject,
      text: emailBody,
      fromName: BRAND_NAME,
      fromEmail: ADMIN_EMAIL,
    });
  }

  if (customerPhone) {
    const whatsappBody = `Hi ${customerName}, your order ${orderId} has just been delivered. Thank you for shopping with us!`;
    await sendWhatsAppMessage({ to: customerPhone, body: whatsappBody });
  }
}