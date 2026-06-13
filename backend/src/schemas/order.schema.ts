import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "PAID",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
