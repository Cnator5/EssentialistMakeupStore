// Updated mail.js with guest order notification support
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


export async function sendOrderNotificationToAdmin(orderArray) {
  for (const order of orderArray) {
    // Fetch Address (as before)
    let addressObj = order.delivery_address;
    let addressText = "N/A";
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

    // Customer Info
    const customerName =
      addressObj?.name ||
      order.contact_info?.name ||
      "N/A";
    const customerEmail = order.contact_info?.customer_email || addressObj?.customer_email || "N/A";
    const customerPhone = order.contact_info?.mobile || addressObj?.mobile || "N/A";

    // Compose products list (NEW)
    let productsText = "";
    if (Array.isArray(order.products) && order.products.length > 0) {
      productsText = order.products.map((prod, idx) => 
        `#${idx+1}
  Product: ${prod.product_details.name}
  Qty: ${prod.quantity}
  Price: ${prod.price}
  Images: ${Array.isArray(prod.product_details.image) ? prod.product_details.image.join(", ") : prod.product_details.image}
      `.trim()
      ).join("\n\n");
    } else {
      productsText = "N/A";
    }

    const subject = `${order.is_guest ? '[GUEST] ' : ''}New Order: ${order.orderId}`;
    const text = `
Order ID: ${order.orderId}
Products:
${productsText}
Total: ${order.subTotalAmt}
Customer Name: ${customerName}
Customer Email: ${customerEmail}
Customer Phone: ${customerPhone}
Customer Address: ${addressText}
${order.is_guest ? 'GUEST ORDER: Yes' : ''}
    `.trim();

    // Send Email
    await transporter.sendMail({
      from: `"${customerName}" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_RECEIVE_EMAIL,
      replyTo: customerEmail !== "N/A" ? customerEmail : undefined,
      subject,
      text
    });
  }
}