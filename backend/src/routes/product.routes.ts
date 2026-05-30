import { Router } from "express";
import * as productController from "../controllers/product.controller.js";

const router = Router();

router.post(
  "/",
  productController.createProduct
);

router.get(
  "/",
  productController.getProducts
);

router.get(
  "/:id",
  productController.getProductById
);

router.delete(
  "/:id",
  productController.deleteProduct
);
router.put(
  "/:id",
  productController.updateProduct
);

export default router;