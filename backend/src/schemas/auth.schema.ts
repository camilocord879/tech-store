import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "Nombre muy corto"),

    lastName: z.string().min(2, "Apellido muy corto"),

    username: z
      .string()
      .min(4)
      .max(20)
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Solo letras, números y guion bajo"
      ),

    email: z.email(),

    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Teléfono inválido"),
    
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Debe contener una mayúscula")
      .regex(/[a-z]/, "Debe contener una minúscula")
      .regex(/[0-9]/, "Debe contener un número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener un carácter especial"
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }
  );

export type RegisterInput = z.infer<
  typeof registerSchema
>;