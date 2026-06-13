import type { Request, Response, NextFunction } from "express";

function sanitizeValue(value: any): any {
  if (typeof value === "string") {
    // Escapar etiquetas HTML básicas para evitar XSS y limpiar espacios en blanco
    return value
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .trim();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value !== null && typeof value === "object") {
    const clean: Record<string, any> = {};
    for (const key of Object.keys(value)) {
      // Evitar contaminación de prototipos
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        continue;
      }
      clean[key] = sanitizeValue(value[key]);
    }
    return clean;
  }
  return value;
}

export function sanitizeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  if (req.query) {
    req.query = sanitizeValue(req.query);
  }
  if (req.params) {
    req.params = sanitizeValue(req.params);
  }
  next();
}
