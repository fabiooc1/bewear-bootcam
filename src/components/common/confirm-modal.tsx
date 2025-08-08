import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ConfirmModalProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

export function ConfirmModal({
  title,
  message,
  onCancel,
  onConfirm,
  isOpen,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
    
        <DialogFooter className="flex flex-row justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button variant="destructive" onClick={onConfirm}>
              Confirmar
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}