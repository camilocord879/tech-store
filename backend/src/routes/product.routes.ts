import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  productController.createProduct,
  adminMiddleware,
  authMiddleware
);

router.get(
  "/",
  productController.getProducts,
  adminMiddleware,
  authMiddleware
);

router.get(
  "/:id",
  productController.getProductById,
  adminMiddleware,
  authMiddleware
);

router.delete(
  "/:id",
  productController.deleteProduct,
  adminMiddleware,
  authMiddleware  
);
router.put(
  "/:id",
  productController.updateProduct,
  adminMiddleware,
  authMiddleware
);
router.get(
  "/featured",
  productController.getFeaturedProducts,
  adminMiddleware,
  authMiddleware
);
export default router;