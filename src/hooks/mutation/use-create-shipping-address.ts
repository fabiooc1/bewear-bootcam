import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddressAction } from "@/actions/create-shipping-address";
import { getUserAddressesQueryKey } from "../queries/use-user-addresses";

export const getCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: createShippingAddressAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
};