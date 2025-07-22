import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import { sendOrderNotificationToAdmin } from "../utils/mail.js";
import AddressModel from "../models/address.model.js";


export async function CashOnDeliveryOrderController(request, response) {
  try {
    const userId = request.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

    // Fetch the selected address object
    const addressObj = await AddressModel.findById(addressId).lean();

    const orderId = `ORD-${new mongoose.Types.ObjectId()}`;
    const products = list_items.map(el => ({
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        image: el.productId.image
      },
      quantity: el.quantity,
      price: el.productId.price
    }));

    const orderPayload = {
      userId,
      orderId,
      products,
      paymentId: "",
      payment_status: "CASH ON DELIVERY",
      delivery_address: addressId,
      contact_info: {
        name: addressObj?.name || "",
        customer_email: addressObj?.customer_email || "",
        mobile: addressObj?.mobile || ""
      },
      subTotalAmt,
      totalAmt,
      is_guest: false
    };

    const generatedOrder = await OrderModel.create(orderPayload);

    // Populate delivery address for order (optional for email)
    const populatedOrder = await OrderModel.findById(generatedOrder._id).populate("delivery_address");

    await CartProductModel.deleteMany({ userId });
    await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

    // Send notification to admin with address included
    await sendOrderNotificationToAdmin([populatedOrder]);

    return response.json({
      message: "Order placed successfully",
      error: false,
      success: true,
      data: generatedOrder
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// Guest user order creation
// Updated order.controller.js with guest order support - fix for duplicate orderId
export async function GuestCashOnDeliveryOrderController(request, response) {
  try {
    const { list_items, totalAmt, subTotalAmt, isGuestOrder, ...addressData } = request.body;

    const guestOrderId = `GUEST-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const products = list_items.map(el => ({
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        image: el.productId.image
      },
      quantity: el.quantity,
      price: el.productId.price
    }));

    const orderPayload = {
      orderId: guestOrderId,
      products,
      paymentId: "",
      payment_status: "CASH ON DELIVERY",
      delivery_address: addressData, // Store full address object
      contact_info: {
        name: addressData.name,
        customer_email: addressData.customer_email,
        mobile: addressData.mobile
      },
      subTotalAmt,
      totalAmt,
      is_guest: true
    };

    const generatedOrder = await OrderModel.create(orderPayload);

    // Send notification to admin
    await sendOrderNotificationToAdmin([generatedOrder]);

    return response.json({
      message: "Guest order placed successfully",
      error: false,
      success: true,
      orderId: guestOrderId,
      data: generatedOrder
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// calculate the price with discount
// pricewithDiscount(1000,10) => 900
export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

//stripe payment controller
export async function paymentController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        // const user = await UserModel.findById(userId)
        const user = await UserModel.findById(userId)
  .populate('shopping_cart')
  .populate('orderHistory')
  .populate('address_details');

        const line_items  = list_items.map(item =>{
            return{
               price_data : {
                    currency : 'xaf', 
                    product_data : {
                        name : item.productId.name,
                        images : item.productId.image,
                        metadata : {
                            productId : item.productId._id
                        }
                    },
                    unit_amount : pricewithDiscount(item.productId.price,item.productId.discount)   
               },
               adjustable_quantity : {
                    enabled : true,
                    minimum : 1
               },
               quantity : item.quantity 
            }
        })

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : user.email,
            metadata : {
                userId : userId,
                addressId : addressId
            },
            line_items : line_items,
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await Stripe.checkout.sessions.create(params) 

        return response.status(200).json(session)

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


const getOrderProductItems = async({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
 })=>{
    const productList = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)

            const paylod = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : product.metadata.productId, 
                product_details : {
                    name : product.name,
                    image : product.images
                } ,
                paymentId : paymentId,
                payment_status : payment_status,
                delivery_address : addressId,
                subTotalAmt  : Number(item.amount_total / 100),
                totalAmt  :  Number(item.amount_total / 100),
            }

            productList.push(paylod)
        }
    }

    return productList
}

// http://localhost:1010/api/order/webhook
export async function webhookStripe(request,response){
    const event = request.body;
    const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

    console.log("event",event)

    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
      const userId = session.metadata.userId
      const orderProduct = await getOrderProductItems(
        {
            lineItems : lineItems,
            userId : userId,
            addressId : session.metadata.addressId,
            paymentId  : session.payment_intent,
            payment_status : session.payment_status,
        })
    
      const order = await OrderModel.insertMany(orderProduct)

        console.log(order)
        if(Boolean(order[0])){
            const removeCartItems = await  UserModel.findByIdAndUpdate(userId,{
                shopping_cart : []
            })
            const removeCartProductDB = await CartProductModel.deleteMany({ userId : userId})
        }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
}


export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}