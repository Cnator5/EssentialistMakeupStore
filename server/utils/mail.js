import nodemailer from "nodemailer";
import AddressModel from "../models/address.model.js";

// Setup the transporter
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASS
  }
});

/**
 * Sends order notification emails to admin for each order in orderArray
 * @param {Array<Object>} orderArray - Array of order objects
 */
export async function sendOrderNotificationToAdmin(orderArray) {
  for (const order of orderArray) {
    // ---------- Fetch Address ----------
    let addressObj = order.delivery_address;
    let addressText = "N/A";

    // If delivery_address is a string (ObjectId) or only has _id, fetch from DB
    if (addressObj) {
      if (
        typeof addressObj === "string" ||
        (addressObj._id && !addressObj.address_line)
      ) {
        try {
          addressObj = await AddressModel.findById(
            typeof addressObj === "string" ? addressObj : addressObj._id
          ).lean();
        } catch (err) {
          addressObj = null;
        }
      }
      if (addressObj) {
        addressText = `
${addressObj.address_line || ""}, 
${addressObj.city || ""}, ${addressObj.state || ""}, 
${addressObj.country || ""} - ${addressObj.pincode || ""}
Mobile: ${addressObj.mobile || ""}
        `.trim();
      }
    }

    // ---------- Customer Info ----------
    const customerName =
      addressObj?.name ||
      order.contact_info?.name ||
      "N/A";
    const customerEmail = order.contact_info?.customer_email || addressObj?.customer_email || "N/A";
    const customerPhone = order.contact_info?.phone || addressObj?.mobile || "N/A";

    // ---------- Order Info ----------
    const {
      orderId,
      product_details,
      subTotalAmt,
      discountAmt,
      shippingAmt,
      totalAmt,
      paymentMethod,
      paymentStatus,
      deliveryStatus,
      createdAt,
      updatedAt,
    } = order;

    // ---------- Product Info ----------
    let productName = "N/A";
    let productImages = "No images available";
    if (product_details) {
      productName = product_details.name || "N/A";
      if (Array.isArray(product_details.image)) {
        productImages = product_details.image.join(", ");
      } else if (typeof product_details.image === "string") {
        productImages = product_details.image;
      }
    }

    // ---------- Email Content ----------
    const subject = `New Order: ${orderId}`;
    const text = `
Order ID: ${orderId}
Product: ${productName}
Image: ${productImages}
Total: ${subTotalAmt}
Customer Name: ${customerName}
Customer Email: ${customerEmail}
Customer Phone: ${customerPhone}
Customer Address: ${addressText}
    `.trim();

    // ---------- Send Email ----------
    await transporter.sendMail({
      from: `"${customerName}" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_RECEIVE_EMAIL,
      replyTo: customerEmail !== "N/A" ? customerEmail : undefined,
      subject,
      text
    });
  }
}