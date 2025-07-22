// // import mongoose from "mongoose";

// // const orderSchema = new mongoose.Schema({
// //     userId : {
// //         type : mongoose.Schema.ObjectId,
// //         ref : 'User'
// //     },
// //     orderId : {
// //         type : String,
// //         required : [true, "Provide orderId"],
// //         unique : true
// //     },
// //     productId : {
// //         type : mongoose.Schema.ObjectId,
// //         ref : "product"
// //     },
// //     product_details : {
// //         name : String,
// //         image : Array,
// //     },
// //     paymentId : {
// //         type : String,
// //         default : ""
// //     },
// //     payment_status : {
// //         type : String,
// //         default : ""
// //     },
// //     delivery_address : {
// //         type : mongoose.Schema.ObjectId,
// //         ref : 'address'
// //     },
// //     subTotalAmt : {
// //         type : Number,
// //         default : 0
// //     },
// //     totalAmt : {
// //         type : Number,
// //         default : 0
// //     },
// //     invoice_receipt : {
// //         type : String,
// //         default : ""
// //     }
// // },{
// //     timestamps : true
// // })

// // const OrderModel = mongoose.model('order',orderSchema)

// // export default OrderModel

// //good as it sent order details to the admin
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User'
//   },
//   orderId: {
//     type: String,
//     required: [true, "Provide orderId"],
//     unique: true
//   },
//   productId: {
//     type: mongoose.Schema.ObjectId,
//     ref: "product"
//   },
//   product_details: {
//     name: String,
//     image: Array,
//   },
//   paymentId: {
//     type: String,
//     default: ""
//   },
//   payment_status: {
//     type: String,
//     default: ""
//   },
//   delivery_address: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'address'
//   },
//   subTotalAmt: {
//     type: Number,
//     default: 0
//   },
//   totalAmt: {
//     type: Number,
//     default: 0
//   },
//   invoice_receipt: {
//     type: String,
//     default: ""
//   },
//   // Order schema:
// delivery_address: {
//   type: mongoose.Schema.Types.Mixed, // Accepts either ObjectId or raw object
//   required: true,
// },
// contact_info: {
//   type: mongoose.Schema.Types.Mixed,
//   required: true,
// },
// is_guest: { type: Boolean, default: false },
// }, { timestamps: true });

// const OrderModel = mongoose.model('order', orderSchema);

// export default OrderModel;



// Updated order.model.js with guest order support
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User'
//   },
//   orderId: {
//     type: String,
//     required: [true, "Provide orderId"],
//     unique: true
//   },
//   productId: {
//     type: mongoose.Schema.ObjectId,
//     ref: "product"
//   },
//   product_details: {
//     name: String,
//     image: Array,
//   },
//   paymentId: {
//     type: String,
//     default: ""
//   },
//   payment_status: {
//     type: String,
//     default: ""
//   },
//   delivery_address: {
//     type: mongoose.Schema.Types.Mixed, // Accepts either ObjectId or raw object
//     required: true,
//   },
//   contact_info: {
//     name: String,
//     customer_email: String,
//     mobile: String
//   },
//   subTotalAmt: {
//     type: Number,
//     default: 0
//   },
//   totalAmt: {
//     type: Number,
//     default: 0
//   },
//   invoice_receipt: {
//     type: String,
//     default: ""
//   },
//   is_guest: { 
//     type: Boolean, 
//     default: false 
//   },
// }, { timestamps: true });

// const OrderModel = mongoose.model('order', orderSchema);

// export default OrderModel;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  orderId: {
    type: String,
    required: [true, "Provide orderId"],
    unique: true
  },
  products: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: "product" },
      product_details: {
        name: String,
        image: [String],
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 }
    }
  ],
  paymentId: { type: String, default: "" },
  payment_status: { type: String, default: "" },
  delivery_address: { type: mongoose.Schema.Types.Mixed, required: true },
  contact_info: {
    name: String,
    customer_email: String,
    mobile: String
  },
  subTotalAmt: { type: Number, default: 0 },
  totalAmt: { type: Number, default: 0 },
  invoice_receipt: { type: String, default: "" },
  is_guest: { type: Boolean, default: false }
}, { timestamps: true });

const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel;