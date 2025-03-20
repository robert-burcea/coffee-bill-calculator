
import { Product, BillItem, Bill } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";
import { CurrentBill } from "@/components/CurrentBill";
import { BillHistory } from "@/components/BillHistory";
import { DailyTotal } from "@/components/DailyTotal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    // When searching, show hidden products that match the search
    if (searchQuery) {
      return (
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.barcode?.includes(searchQuery))
      );
    }

    // Don't show hidden products when no category is selected (Toate)
    if (selectedCategory === null && product.hidden) {
      return false;
    }
    
    // Show products based on category selection
    return selectedCategory ? product.category === selectedCategory : true;
  });

  return (
    <div className="min-h-screen">
      <div
        className={cn(
          "grid md:grid-cols-[2fr,1fr] gap-6 mb-20",
          !isMobile && "ml-52 mr-4"
        )}
      >
        <div>
          <SearchBar onSearch={setSearchQuery} />
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
    </div>
  );
};
