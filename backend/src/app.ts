import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import { sanitizeMiddleware } from "./middlewares/sanitize.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});
// Seguridad de cabeceras
app.use(helmet());

app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 peticiones por ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Demasiadas peticiones desde esta IP. Por favor, intente más tarde.",
  },
});
app.use("/api", limiter);

app.use(express.json());

// Sanitización de entradas contra XSS y prototype pollution
//appse(sanitizeMiddleware);
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
app.use(
  "/api/admin",
  adminRoutes
);
app.use(
  "/api/contact",
  contactRoutes
);

// Manejador global de errores (debe registrarse al final)
app.use(errorMiddleware);
export default app;