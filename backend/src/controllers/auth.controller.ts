import type { Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schema.js";
import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";
export async function register(
  req: Request,
  res: Response
) {
  try {
    const data =
      registerSchema.parse(req.body);

    const user = await registerUser(data);

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
export async function login(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    return res.status(200).json(result);

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error"
    });

  }
}