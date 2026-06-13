import "dotenv/config";
import app from "./app.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const PORT = process.env.PORT || 3000;
console.log("SERVER VERSION 13");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get(
  "/api/private",
  authMiddleware,
  (req, res) => {
    res.json({
      message:
        "Ruta protegida funcionando",
    });
  }
);