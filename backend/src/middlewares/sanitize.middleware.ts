import type {
  Request,
  Response,
  NextFunction,
} from "express";

function sanitizeValue(value: any): any {
  if (typeof value === "string") {
    return value
      .replace(
        /<script[^>]*>([\s\S]*?)<\/script>/gi,
        ""
      )
      .replace(/<\/?[^>]+(>|$)/g, "")
      .trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const clean: Record<string, any> = {};

    for (const key of Object.keys(value)) {
      if (
        key === "__proto__" ||
        key === "constructor" ||
        key === "prototype"
      ) {
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
  // Body
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }

  // Params
  if (req.params) {
    Object.assign(
      req.params,
      sanitizeValue(req.params)
    );
  }

  // Query
  if (req.query) {
    Object.assign(
      req.query,
      sanitizeValue(req.query)
    );
  }

  next();
}