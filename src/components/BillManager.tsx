import { useState } from "react";
import { Bill, BillItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { addBill, removeLastBill, clearBills } from "@/utils/storage";

interface BillManagerProps {
  bills: Bill[];
  setBills: (bills: Bill[]) => void;
  currentBill: BillItem[];
  setCurrentBill: (items: BillItem[]) => void;
  location: "cantina" | "viva";
  setIsSheetOpen: (open: boolean) => void;
}

export const BillManager = ({
  bills,
  setBills,
  currentBill,
  setCurrentBill,
  location,
  setIsSheetOpen,
}: BillManagerProps) => {
  const [confirmClearDay, setConfirmClearDay] = useState(false);
  const [confirmDeleteLast, setConfirmDeleteLast] = useState(false);
  const { toast } = useToast();

  const handleCheckout = () => {
    if (currentBill.length === 0) {
      toast({
        title: "Eroare",
        description: "Nu există produse în bon",
        variant: "destructive",
      });
      return;
    }

    const total = currentBill.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newBill: Bill = {
      id: Date.now().toString(),
      items: currentBill,
      total,
      timestamp: Date.now(),
      location,
    };

    addBill(newBill);
    setBills((prev) => [...prev, newBill]);
    setCurrentBill([]);
    toast({
      title: "Succes",
      description: "Bonul a fost salvat",
    });
  };

  const handleClearDay = () => {
    clearBills();
    setBills([]);
    setConfirmClearDay(false);
    setIsSheetOpen(false);
    toast({
      title: "Succes",
      description: "Ziua fiscală a fost ștearsă",
    });
  };

  const handleDeleteLastBill = () => {
    removeLastBill();
    setBills((prev) => prev.slice(0, -1));
    setConfirmDeleteLast(false);
    setIsSheetOpen(false);
    toast({
      title: "Succes",
      description: "Ultimul bon a fost șters",
    });
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmClearDay}
        onConfirm={handleClearDay}
        onCancel={() => setConfirmClearDay(false)}
        title="Confirmare"
        description="Ești sigur că vrei să ștergi ziua fiscală?"
      />

      <ConfirmDialog
        isOpen={confirmDeleteLast}
        onConfirm={handleDeleteLastBill}
        onCancel={() => setConfirmDeleteLast(false)}
        title="Confirmare"
        description="Ești sigur că vrei să ștergi ultimul bon?"
      />
    </>
  );
};