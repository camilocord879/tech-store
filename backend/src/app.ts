import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api/cart",
  cartRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);

app.get("/", (_req, res) => {
  res.json({
    message: "TechStore API running"
  });
});

app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/products",
  productRoutes
);

export default app;