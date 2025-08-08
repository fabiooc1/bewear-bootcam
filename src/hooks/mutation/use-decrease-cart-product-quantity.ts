import { decreaseCartProductQuantityAction } from "@/actions/decrease-cart-product-quantity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USE_CART_QUERY_KEY } from "../queries/use-cart";

export function useDecreaseCartProductQuantity(cartItemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["decreaseCartProductQuantity"],
    mutationFn: () => decreaseCartProductQuantityAction({ cartItemId }),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USE_CART_QUERY_KEY,
      });
    },
  });
}