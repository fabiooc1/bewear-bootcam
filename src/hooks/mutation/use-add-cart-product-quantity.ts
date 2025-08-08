import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USE_CART_QUERY_KEY } from "../queries/use-cart";
import { addProductToCartAction } from "@/actions/add-cart-product";

export function useAddCartProductQuantity(productVariantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addProductToCart"],
    mutationFn: () =>
      addProductToCartAction({
        productVariantId,
        quantity: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USE_CART_QUERY_KEY,
      });
    },
  });
}
