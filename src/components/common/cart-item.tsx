import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatCentsToBRL } from "@/helpers/money";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem(item: CartItemProps) {
  return (
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
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}} disabled={item.quantity <= 1}>
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{item.quantity}</p>
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(item.productVariantPriceInCents * item.quantity)}
        </p>
      </div>
    </div>
  );
}
