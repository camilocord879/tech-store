import type {
  Request,
  Response,
  NextFunction,
} from "express";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const role = req.user?.role?.toString().toUpperCase();

  if (role !== "ADMIN") {
    return res.status(403).json({
      message: "Acceso denegado",
    });
  }

  next();
}