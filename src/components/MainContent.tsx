import { Product, BillItem, Bill } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";
import { CurrentBill } from "@/components/CurrentBill";
import { BillHistory } from "@/components/BillHistory";
import { DailyTotal } from "@/components/DailyTotal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  selectedCategory,
  onProductClick,
  onRemoveItem,
}: MainContentProps) => {
  const isMobile = useIsMobile();

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div
      className={cn(
        "grid md:grid-cols-[2fr,1fr] gap-6 mb-20",
        !isMobile && "ml-48"
      )}
    >
      <div>
        <ProductGrid
          products={filteredProducts}
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