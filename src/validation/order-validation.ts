import { z, ZodType } from "zod";

export class OrderValidation {

    static readonly CREATE: ZodType = z.object({
        customerId: z.number().positive("Customer ID must be positive"),
        restaurantId: z.number().positive("Restaurant ID must be positive"),
        itemAmount: z.number().min(1, "Item amount must be at least 1")
    });
}