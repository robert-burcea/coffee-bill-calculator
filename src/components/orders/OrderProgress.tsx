
import { Progress } from "@/components/ui/progress";

interface OrderProgressProps {
  total: number;
  completed: number;
}

export const OrderProgress = ({ total, completed }: OrderProgressProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Progress: {completed} din {total} produse comandate
        </span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
