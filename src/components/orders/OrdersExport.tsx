
import { Button } from "@/components/ui/button";
import { Download, Save, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface OrdersExportProps {
  onExport: () => void;
  onFinalize: () => void;
  onReset: () => void;
}

export const OrdersExport = ({ onExport, onFinalize, onReset }: OrdersExportProps) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button onClick={onFinalize} variant="default" className="gap-2">
          <Save className="h-4 w-4" />
          Finalizează comanda
        </Button>
        <Button onClick={onExport} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportă comanda (XLSX)
        </Button>
        <Button 
          onClick={() => setShowResetConfirm(true)} 
          variant="destructive" 
          className="gap-2 sm:ml-4"
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
        title="Resetare comenzi"
        description="Ești sigur că vrei să resetezi toate comenzile? Această acțiune nu poate fi anulată."
      />
    </>
  );
};
