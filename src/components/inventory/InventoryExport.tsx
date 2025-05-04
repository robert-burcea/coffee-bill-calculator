
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface InventoryExportProps {
  onExport: () => void;
  onReset: () => void;
}

export const InventoryExport = ({ onExport, onReset }: InventoryExportProps) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button onClick={onExport} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportă inventar (XLSX)
        </Button>
        <Button 
          onClick={() => setShowResetConfirm(true)} 
          variant="destructive" 
          className="gap-2 ml-4"
        >
          <RefreshCcw className="h-4 w-4" />
          Resetează
        </Button>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onConfirm={() => {
          onReset();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
        title="Resetare inventar"
        description="Ești sigur că vrei să resetezi tot inventarul? Această acțiune nu poate fi anulată."
      />
    </>
  );
};
