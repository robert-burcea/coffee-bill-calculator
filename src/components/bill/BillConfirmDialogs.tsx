import { ConfirmDialog } from "@/components/ConfirmDialog";

interface BillConfirmDialogsProps {
  confirmClearDay: boolean;
  confirmDeleteLast: boolean;
  onClearDay: () => void;
  onDeleteLastBill: () => void;
  setConfirmClearDay: (value: boolean) => void;
  setConfirmDeleteLast: (value: boolean) => void;
}

export const BillConfirmDialogs = ({
  confirmClearDay,
  confirmDeleteLast,
  onClearDay,
  onDeleteLastBill,
  setConfirmClearDay,
  setConfirmDeleteLast,
}: BillConfirmDialogsProps) => {
  return (
    <>
      <ConfirmDialog
        isOpen={confirmClearDay}
        onConfirm={onClearDay}
        onCancel={() => setConfirmClearDay(false)}
        title="Confirmare"
        description="Ești sigur că vrei să ștergi ziua fiscală?"
      />

      <ConfirmDialog
        isOpen={confirmDeleteLast}
        onConfirm={onDeleteLastBill}
        onCancel={() => setConfirmDeleteLast(false)}
        title="Confirmare"
        description="Ești sigur că vrei să ștergi ultimul bon?"
      />
    </>
  );
};