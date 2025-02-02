import { useState } from "react";
import { Bill, BillItem } from "@/types";
import { BillConfirmDialogs } from "./bill/BillConfirmDialogs";
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
  const [confirmClearDay, setConfirmClearDay] = useState(false);
  const [confirmDeleteLast, setConfirmDeleteLast] = useState(false);

  const { handleCheckout, handleClearDay, handleDeleteLastBill } = useBillOperations({
    bills,
    setBills,
    currentBill,
    setCurrentBill,
    location,
    setIsSheetOpen,
    setConfirmClearDay,
    setConfirmDeleteLast,
  });

  return (
    <BillConfirmDialogs
      confirmClearDay={confirmClearDay}
      confirmDeleteLast={confirmDeleteLast}
      onClearDay={handleClearDay}
      onDeleteLastBill={handleDeleteLastBill}
      setConfirmClearDay={setConfirmClearDay}
      setConfirmDeleteLast={setConfirmDeleteLast}
    />
  );
};