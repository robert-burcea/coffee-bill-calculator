
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";

interface OrdersExportProps {
  onExport: () => void;
  onFinalize: () => void;
}

export const OrdersExport = ({ onExport, onFinalize }: OrdersExportProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button onClick={onFinalize} variant="default" className="gap-2">
        <Save className="h-4 w-4" />
        Finalizează comanda
      </Button>
      <Button onClick={onExport} variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Exportă comanda (CSV)
      </Button>
    </div>
  );
};
