import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import logger from "../utils/logger.js";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("=== ERROR MIDDLEWARE ===")
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  // Registrar el error de manera estructurada
  logger.error(err.message || "Error interno del servidor", {
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  // Si el error es de Zod, retornar un formato legible para el cliente
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: err.issues.map((e: any) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }
  console.error("ERROR COMPLETO:");
  console.error(err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  return res.status(status).json({
    success: false,
    message,
  });
}
