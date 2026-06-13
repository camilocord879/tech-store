import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

// Endpoints públicos
router.get(
  "/",
  productController.getProducts
);

router.get(
  "/featured",
  productController.getFeaturedProducts
);

router.get(
  "/:id",
  productController.getProductById
);

// Endpoints administrativos protegidos
router.post(
  "/",
  adminMiddleware,
  productController.createProduct
);

router.delete(
  "/:id",
  adminMiddleware,
  productController.deleteProduct
);

router.put(
  "/:id",
  adminMiddleware,
  productController.updateProduct
);

export default router;