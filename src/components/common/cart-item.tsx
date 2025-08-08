"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatCentsToBRL } from "@/helpers/money";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeProductFromCartAction } from "@/actions/remove-cart-product";
import { decreaseCartProductQuantityAction } from "@/actions/decrease-cart-product-quantity";
import { addProductToCartAction } from "@/actions/add-cart-product";
import { ConfirmModal } from "./confirm-modal";
import { useState } from "react";

interface CartItemProps {
  id: string;
  productVariantId: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem(item: CartItemProps) {
  const [isOpenDeleteProductFromCartModal, setIsOpenDeleteProductFromCartModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: removeProductFromCart, isPending: isPeddingRemove } =
    useMutation({
      mutationKey: ["removeCartProduct"],
      mutationFn: () =>
        removeProductFromCartAction({
          cartItemId: item.id,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });

        toast.success("Produto removido do carrinho!");
      },
    });

  const {
    mutate: decreaseCartProductQuantity,
    isPending: isPendingDecreaseQuantity,
  } = useMutation({
    mutationKey: ["decreaseCartProductQuantity"],
    mutationFn: () =>
      decreaseCartProductQuantityAction({
        cartItemId: item.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const { mutate: addProductToCart, isPending: isPendingAddQuantity } =
    useMutation({
      mutationKey: ["addProductToCart"],
      mutationFn: () =>
        addProductToCartAction({
          productVariantId: item.productVariantId,
          quantity: 1,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },
    });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={item.productVariantImageUrl}
            alt={item.productVariantName}
            width={78}
            height={78}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{item.productName}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {item.productVariantName}
            </p>
            <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
              <Button
                className="h-4 w-4"
                variant="ghost"
                onClick={() => decreaseCartProductQuantity()}
                disabled={item.quantity <= 1 || isPendingDecreaseQuantity}
              >
                <MinusIcon />
              </Button>

              <p className="text-xs font-medium">{item.quantity}</p>
              <Button
                className="h-4 w-4"
                variant="ghost"
                onClick={() => addProductToCart()}
                disabled={isPendingAddQuantity}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpenDeleteProductFromCartModal(true)}
            disabled={isPeddingRemove}
          >
            <TrashIcon />
          </Button>
          <p className="text-sm font-bold">
            {formatCentsToBRL(item.productVariantPriceInCents * item.quantity)}
          </p>
        </div>
      </div>

      <ConfirmModal 
        title="Deletar produto" 
        message="Você tem certeza que deseja deletar este produto?" 
        onCancel={() => setIsOpenDeleteProductFromCartModal(false)} 
        onConfirm={() => removeProductFromCart()} 
        isOpen={isOpenDeleteProductFromCartModal} 
      />
    </>
  );
}
