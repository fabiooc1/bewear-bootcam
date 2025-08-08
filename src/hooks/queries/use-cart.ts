import { useQuery } from "@tanstack/react-query";
import { getCartAction } from "@/actions/get-cart";

export const getUseCartQueryKey = () => ["cart"] as const;

export const useCart = (params?: {
  initialData?: Awaited<ReturnType<typeof getCartAction>>;
}) => {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: () => getCartAction(),
    initialData: params?.initialData,
  });
};