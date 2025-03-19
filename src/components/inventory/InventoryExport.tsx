
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface InventoryExportProps {
  onExport: () => void;
}

export const InventoryExport = ({ onExport }: InventoryExportProps) => {
  return (
    <div className="flex justify-end">
      <Button onClick={onExport} variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Exportă inventar (CSV)
      </Button>
    </div>
  );
};
