import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3).max(100),

  description: z.string().min(10),

  price: z.number().positive(),

  image: z.string().url(),

  category: z.string().min(3),

  stock: z.number().int().min(0),

  featured: z.boolean().optional(),
});

export type CreateProductInput =
  z.infer<typeof createProductSchema>;