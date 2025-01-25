import { BillItem } from "@/types";

interface CurrentBillProps {
  items: BillItem[];
  onRemoveItem: (index: number) => void;
}

export const CurrentBill = ({ items, onRemoveItem }: CurrentBillProps) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex-1">
              <span className="font-medium">{item.product.name}</span>
              {item.quantity > 1 && <span className="ml-2 text-gray-600">x{item.quantity}</span>}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-900">{item.product.price * item.quantity} RON</span>
              <button
                onClick={() => onRemoveItem(index)}
                className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
              >
                Anuleaza
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>{total} RON</span>
          </div>
        </div>
      )}
    </div>
  );
};