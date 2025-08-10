"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { AddAddressForm } from "./add-address-form";
import { shippingAddressTable } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";
import { formatAddress } from "@/helpers/address";
import { Button } from "@/components/ui/button";
import { useUpdateCartShippingAddress } from "@/hooks/mutation/use-update-cart-shipping-address";
import { toast } from "sonner";

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

export function Addresses({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );

  const { 
    mutateAsync: updateCartShippingAddressMutation, 
    isPending: updateCartShippingAddressMutationPending 
  } = useUpdateCartShippingAddress();

  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  });

  async function handleGoToPayment() {
    if (!selectedAddress || selectedAddress === "add_new") return;

    try {
      await updateCartShippingAddressMutation({
        shippingAddressId: selectedAddress,
      });
      
      router.push("/cart/confirmation");
    } catch (error) {
      toast.error("Erro ao selecionar endereço. Tente novamente.");
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>

        <CardContent className="mt-2 p-0">
          {isLoading ? (
            <div className="py-4 text-center">
              <p>Carregando endereços...</p>
            </div>
          ) : (
            <RadioGroup
              value={selectedAddress}
              onValueChange={setSelectedAddress}
            >
              {addresses?.length === 0 && (
                <div className="py-4 text-center">
                  <p className="text-muted-foreground">
                    Você ainda não possui endereços cadastrados.
                  </p>
                </div>
              )}

              {addresses?.map((address) => (
                <Card key={address.id}>
                  <CardContent>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value={address.id} id={address.id} />
                      <div className="flex-1">
                        <Label htmlFor={address.id} className="cursor-pointer">
                          <div>
                            <p className="text-sm">{formatAddress(address)}</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="add_new" id="add_new" />
                    <Label htmlFor="add_new">Adicionar novo endereço</Label>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          )}

          {selectedAddress && selectedAddress !== "add_new" && (
            <div className="mt-4">
              <Button
                onClick={handleGoToPayment}
                className="w-full"
                disabled={updateCartShippingAddressMutationPending}
              >
                {updateCartShippingAddressMutationPending
                  ? "Processando..."
                  : "Ir para pagamento"}
              </Button>
            </div>
          )}

          {selectedAddress === "add_new" && (
            <AddAddressForm
              onSuccess={(newAddressId) => setSelectedAddress(newAddressId)}
            />
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
