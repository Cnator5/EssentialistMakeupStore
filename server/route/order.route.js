// import { Router } from 'express'
// import auth from '../middleware/auth.js'
// import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js'

// const orderRouter = Router()

// orderRouter.post("/cash-on-delivery",CashOnDeliveryOrderController)
// // orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)
// orderRouter.post('/checkout',auth,paymentController)
// orderRouter.post('/webhook',webhookStripe)
// orderRouter.get("/order-list",auth,getOrderDetailsController)

// export default orderRouter


// Updated order.router.js with guest order support
import { Router } from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryOrderController, GuestCashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController)
orderRouter.post("/guest-cod", GuestCashOnDeliveryOrderController)
orderRouter.post('/checkout', auth, paymentController)
orderRouter.post('/webhook', webhookStripe)
orderRouter.get("/order-list", auth, getOrderDetailsController)

export default orderRouter