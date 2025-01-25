import { Bill, Product } from "@/types";

interface DailyTotalProps {
  bills: Bill[];
}

export const DailyTotal = ({ bills }: DailyTotalProps) => {
  const calculateDailyStats = () => {
    const productTotals = new Map<string, { quantity: number; total: number; name: string }>();
    let totalRevenue = 0;

    bills.forEach(bill => {
      totalRevenue += bill.total;
      bill.items.forEach(item => {
        const existing = productTotals.get(item.product.id);
        if (existing) {
          existing.quantity += item.quantity;
          existing.total += item.product.price * item.quantity;
        } else {
          productTotals.set(item.product.id, {
            quantity: item.quantity,
            total: item.product.price * item.quantity,
            name: item.product.name
          });
        }
      });
    });

    return {
      products: Array.from(productTotals.values()),
      totalRevenue
    };
  };

  const stats = calculateDailyStats();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="font-bold text-xl mb-4">Sumar Zi</h2>
        <div className="space-y-2">
          {stats.products.map((product, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {product.name} x{product.quantity}
              </span>
              <span>{product.total} RON</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total Zi:</span>
            <span>{stats.totalRevenue} RON</span>
          </div>
        </div>
      </div>
    </div>
  );
};