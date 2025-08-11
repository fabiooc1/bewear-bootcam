"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { useFinishOrder } from "@/hooks/mutation/use-finish-order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function FinishOrderButton() {
  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(true);
  const { mutate, isPending } = useFinishOrder();

  function handleFinishOrder() {
    mutate();
    setSuccessDialogIsOpen(true)
  }

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={handleFinishOrder}
        disabled={isPending}
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Finalizar pedido
      </Button>

      <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
        <DialogContent className="text-center">
          <Image 
            src="/illustration.svg"
            alt="Ilustração de um pedido finalizado"
            width={300}
            height={300}
            className="mx-auto"
          />

          <DialogTitle className="text-2xl mt-4">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium">Seu pedido foi efetuado com sucesso. Você pode acompanhar o status da seção de "Meus Pedidos".</DialogDescription>
        
          <DialogFooter>
            <Button className="rounded-full" size="lg">
              Ver meus pedidos
            </Button>

            <Button variant="outline" className="rounded-full" size="lg">
              Voltar para a loja
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
