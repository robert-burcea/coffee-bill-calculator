
import { Progress } from "@/components/ui/progress";

interface InventoryProgressProps {
  total: number;
  completed: number;
}

export const InventoryProgress = ({ total, completed }: InventoryProgressProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Progres Inventar</h2>
        <span className="text-sm">
          {completed} din {total} produse inventariate ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
