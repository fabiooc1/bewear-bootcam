"use server";

import { auth } from "@/lib/auth";
import { RemoveProductFromCartSchema, RemoveProductFromCartSchemaType } from "./schema";
import { headers } from "next/headers";
import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function removeCartProduct(data: RemoveProductFromCartSchemaType) {
    RemoveProductFromCartSchema.parse(data)

      const session = await auth.api.getSession({
        headers: await headers(),
      });
    
      if (!session?.user) {
        throw new Error("Unauthorized");
      }
     
      const cartItem = await db.query.cartItemTable.findFirst({
        where: (cartItem, { eq }) =>
          eq(cartItem.id, data.cartItemId),
        with: {
          cart: true
        }
      });
    
      if (!cartItem || cartItem.cart.userId !== session.user.id) {
        throw new Error("Cart item not found");
      }

      await db.delete(cartItemTable)
        .where(eq(cartItemTable.id, cartItem.id));
}