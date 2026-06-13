import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"], {
    errorMap: () => ({
      message: "El estado debe ser PENDING, PAID, SHIPPED, DELIVERED o CANCELLED",
    }),
  }),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
