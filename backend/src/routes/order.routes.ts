import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getInvoice,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

router.get(
  "/:id/invoice",
  authMiddleware,
  getInvoice
);

export default router;