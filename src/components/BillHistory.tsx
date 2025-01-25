import { Bill } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BillHistoryProps {
  bills: Bill[];
}

export const BillHistory = ({ bills }: BillHistoryProps) => {
  return (
    <div className="space-y-4">
      {bills.map((bill, index) => (
        <div key={bill.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-bold mb-2">
            Bon #{index + 1} - {new Date(bill.timestamp).toLocaleString()}
          </div>
          <div className="space-y-2">
            {bill.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex justify-between">
                <span>
                  {item.product.name} {item.quantity > 1 && `x${item.quantity}`}
                </span>
                <span>{item.product.price * item.quantity} RON</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 font-bold flex justify-between">
            <span>Total:</span>
            <span>{bill.total} RON</span>
          </div>
        </div>
      ))}
    </div>
  );
};