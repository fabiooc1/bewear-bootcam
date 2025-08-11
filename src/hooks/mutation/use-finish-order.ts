import { finishOrder } from "@/actions/finish-order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseCartQueryKey } from "../queries/use-cart";

export const getFinishORderMutationKey = () => ["finish-order"]

export function useFinishOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: getFinishORderMutationKey(),
        mutationFn: finishOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUseCartQueryKey()
            })
        }
    })
}