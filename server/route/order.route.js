import { Router } from "express";
import auth from "../middleware/auth.js";
import optionalAuth from "../middleware/optionalAuth.js";
import {
  CashOnDeliveryOrderController,
  GuestCashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
  verifyReceiptByTokenController,
  downloadReceiptController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/verify-receipt", verifyReceiptByTokenController);
orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
orderRouter.post("/guest-cod", GuestCashOnDeliveryOrderController);
orderRouter.post("/checkout", auth, paymentController);
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.get("/receipt/:orderId", optionalAuth, downloadReceiptController);

export default orderRouter;