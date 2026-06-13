import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

export const updateUserProfileSchema = z.object({
  firstName: z.string().min(2, "Nombre muy corto").optional(),
  lastName: z.string().min(2, "Apellido muy corto").optional(),
  username: z
    .string()
    .min(4, "El usuario debe tener al menos 4 caracteres")
    .max(20, "El usuario debe tener máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guion bajo")
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Teléfono inválido")
    .optional(),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
