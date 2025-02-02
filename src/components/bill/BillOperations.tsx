import { Bill, BillItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { addBill, removeLastBill, clearBills } from "@/utils/storage";

interface BillOperationsProps {
  bills: Bill[];
  setBills: (bills: Bill[] | ((prev: Bill[]) => Bill[])) => void;
  currentBill: BillItem[];
  setCurrentBill: (items: BillItem[]) => void;
  location: "cantina" | "viva";
  setIsSheetOpen: (open: boolean) => void;
  setConfirmClearDay: (value: boolean) => void;
  setConfirmDeleteLast: (value: boolean) => void;
}

export const useBillOperations = ({
  bills,
  setBills,
  currentBill,
  setCurrentBill,
  location,
  setIsSheetOpen,
  setConfirmClearDay,
  setConfirmDeleteLast,
}: BillOperationsProps) => {
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
    setBills((prev: Bill[]) => [...prev, newBill]);
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
    setBills((prev: Bill[]) => prev.slice(0, -1));
    setConfirmDeleteLast(false);
    setIsSheetOpen(false);
    toast({
      title: "Succes",
      description: "Ultimul bon a fost șters",
    });
  };

  return {
    handleCheckout,
    handleClearDay,
    handleDeleteLastBill,
  };
};