import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("El correo electrónico no es válido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(["PENDING", "ANSWERED"]),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactStatusInput = z.infer<typeof updateContactStatusSchema>;
