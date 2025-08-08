import { removeProductFromCartAction } from "@/actions/remove-cart-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USE_CART_QUERY_KEY } from "../queries/use-cart";
import { toast } from "sonner";

const USE_REMOVE_PRODUCT_FROM_CART_MUTATION_KEY = (cartItemId: string) => ["removeCartProduct", cartItemId] as const;

export function useRemoveProductFromCart(cartItemId: string) {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: USE_REMOVE_PRODUCT_FROM_CART_MUTATION_KEY(cartItemId),
      mutationFn: () =>
        removeProductFromCartAction({
          cartItemId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: USE_CART_QUERY_KEY,
        });

        toast.success("Produto removido do carrinho!");
      },
    });
}