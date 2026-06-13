import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import * as contactController from "../controllers/contact.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

// Proteger todos los endpoints de administración con el middleware de admin
router.use(adminMiddleware);

router.get("/dashboard", adminController.getDashboard);
router.get("/inventory", adminController.getInventory);
router.patch("/products/:id/stock", adminController.updateStock);

router.get("/orders", adminController.getOrders);
router.patch("/orders/:id/status", adminController.updateOrderStatus);

router.get("/users", adminController.getUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id/role", adminController.updateUserRole);
router.delete("/users/:id", adminController.deleteUser);

// Contact messages admin endpoints
router.get("/contact", contactController.getMessages);
router.patch("/contact/:id", contactController.updateMessageStatus);

export default router;
