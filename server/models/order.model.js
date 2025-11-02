import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.ObjectId, ref: "product" },
    product_details: {
      name: String,
      image: [String],
      sku: String,
      price: Number,
    },
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
  },
  { _id: false }
);

const deliveryEventSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    note: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: [true, "Provide orderId"],
      unique: true,
      index: true,
    },
    products: [orderProductSchema],
    paymentId: { type: String, default: "" },
    payment_status: { type: String, default: "" },
    paymentMethod: { type: String, default: "" },
    delivery_address: { type: mongoose.Schema.Types.Mixed, required: true },
    contact_info: {
      name: String,
      customer_email: String,
      mobile: String,
    },
    subTotalAmt: { type: Number, default: 0 },
    totalAmt: { type: Number, default: 0 },
    totalQuantity: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    invoice_receipt: { type: String, default: "" },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    integrityToken: { type: String, index: true },
    receiptSignature: { type: String, default: "" },
    signatureGeneratedAt: { type: Date },
    is_guest: { type: Boolean, default: false },
    fulfillment_status: { type: String, default: "Processing" },
    deliveredAt: { type: Date },
    deliveryTimeline: {
      type: [deliveryEventSchema],
      default: () => [],
    },
  },
  { timestamps: true }
);

orderSchema.index({ is_guest: 1, integrityToken: 1 });

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;