
import { Bill, BillItem } from "@/types";
import { useBillOperations } from "./bill/BillOperations";

interface BillManagerProps {
  bills: Bill[];
  setBills: (bills: Bill[] | ((prev: Bill[]) => Bill[])) => void;
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
  const { handleCheckout } = useBillOperations({
    bills,
    setBills,
    currentBill,
    setCurrentBill,
    location,
    setIsSheetOpen,
    setConfirmClearDay: () => {},
    setConfirmDeleteLast: () => {},
  });

  return (
    <button 
      onClick={handleCheckout}
      className="hidden"
      data-checkout-trigger
    />
  );
};
