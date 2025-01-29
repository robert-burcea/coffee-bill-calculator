import { Product, BillItem, Bill } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";
import { CurrentBill } from "@/components/CurrentBill";
import { BillHistory } from "@/components/BillHistory";
import { DailyTotal } from "@/components/DailyTotal";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MainContentProps {
  products: Product[];
  currentBill: BillItem[];
  bills: Bill[];
  showDailyTotal: boolean;
  showBillHistory: boolean;
  selectedCategory: string | null;
  onProductClick: (product: Product) => void;
  onRemoveItem: (index: number) => void;
}

export const MainContent = ({
  products,
  currentBill,
  bills,
  showDailyTotal,
  showBillHistory,
  onProductClick,
  onRemoveItem,
}: MainContentProps) => {
  return (
    <div className="grid md:grid-cols-[2fr,1fr] gap-6 mb-20">
      <div>
        <ProductGrid
          products={products}
          currentBill={currentBill}
          onProductClick={onProductClick}
        />
      </div>
      <div className="space-y-4">
        <CurrentBill items={currentBill} onRemoveItem={onRemoveItem} />
        {showDailyTotal && (
          <ScrollArea className="h-[300px]">
            <DailyTotal bills={bills} />
          </ScrollArea>
        )}
        {showBillHistory && (
          <ScrollArea className="h-[300px]">
            <BillHistory bills={[...bills].reverse()} />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};