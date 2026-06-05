import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token requerido",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token requerido",
      });
    }

    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET as string
) as {
  id: string;
  email: string;
  username: string;
  role: string;
};

req.user = {
  userId: decoded.id,
  email: decoded.email,
  role: decoded.role,
};
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};
