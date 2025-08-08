import z from "zod";

export const RemoveProductFromCartSchema = z.object({
    cartItemId: z.uuid(),
})

export type RemoveProductFromCartSchemaType = z.infer<typeof RemoveProductFromCartSchema>;