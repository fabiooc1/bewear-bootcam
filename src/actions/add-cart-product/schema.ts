import { z } from "better-auth";

export const AddProductToCartSchema = z.object({
    productVariantId: z.string().uuid(),
    quantity: z.number().int().min(1),
})

export type AddProductToCartSchemaType = z.infer<typeof AddProductToCartSchema>;