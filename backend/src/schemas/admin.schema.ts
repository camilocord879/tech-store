import { z } from "zod";

export const updateProductStockSchema = z.object({
  stock: z
    .number()
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
});

export type UpdateProductStockInput = z.infer<typeof updateProductStockSchema>;
