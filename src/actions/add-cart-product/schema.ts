import { z } from "zod";

export const AddProductToCartSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type AddProductToCartSchemaType = z.infer<typeof AddProductToCartSchema>;
