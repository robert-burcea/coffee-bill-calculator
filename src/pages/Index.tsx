import { useState } from "react";
import { Product, BillItem, Bill } from "@/types";
import { MenuBar } from "@/components/MenuBar";
import { MainContent } from "@/components/MainContent";
import { BottomMenu } from "@/components/BottomMenu";
import { CategoryBar } from "@/components/CategoryBar";
import { ProductManager } from "@/components/ProductManager";
import { BillManager } from "@/components/BillManager";
import { getBills } from "@/utils/storage";

interface IndexProps {
  location: "cantina" | "viva";
}

const Index = ({ location }: IndexProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBill, setCurrentBill] = useState<BillItem[]>([]);
  const [bills, setBills] = useState<Bill[]>(getBills());
  const [showBillHistory, setShowBillHistory] = useState(false);
  const [showDailyTotal, setShowDailyTotal] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [confirmClearDay, setConfirmClearDay] = useState(false);
  const [confirmDeleteLast, setConfirmDeleteLast] = useState(false);

  const handleProductClick = (product: Product) => {
    setCurrentBill((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (index: number) => {
    setCurrentBill((prev) => prev.filter((_, i) => i !== index));
  };

  const CATEGORIES = {
    cantina: ["MENIURI", "BAUTURI", "MIC DEJUN", "PATISERIE", "SNACKS"],
    viva: ["CAFEA", "BAUTURI", "DESERT"],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProductManager location={location} onProductsLoaded={setProducts} />
      <BillManager
        bills={bills}
        setBills={setBills}
        currentBill={currentBill}
        setCurrentBill={setCurrentBill}
        location={location}
        setIsSheetOpen={setIsSheetOpen}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <MenuBar location={location} />
        <CategoryBar
          categories={CATEGORIES[location]}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          location={location}
        />
        <MainContent
          products={products}
          currentBill={currentBill}
          bills={bills}
          showDailyTotal={showDailyTotal}
          showBillHistory={showBillHistory}
          selectedCategory={selectedCategory}
          onProductClick={handleProductClick}
          onRemoveItem={handleRemoveItem}
        />
      </div>

      <BottomMenu
        onCheckout={() => {
          const billManagerElement = document.querySelector(
            "button[data-checkout-trigger]"
          );
          if (billManagerElement instanceof HTMLButtonElement) {
            billManagerElement.click();
          }
        }}
        onDeleteLastBill={() => setConfirmDeleteLast(true)}
        onToggleBillHistory={() => setShowBillHistory(!showBillHistory)}
        onToggleDailyTotal={() => setShowDailyTotal(!showDailyTotal)}
        onClearDay={() => setConfirmClearDay(true)}
        showBillHistory={showBillHistory}
        showDailyTotal={showDailyTotal}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        location={location}
      />
    </div>
  );
};

export default Index;