import { useEffect, useState } from "react";
import { Product, BillItem, Bill } from "@/types";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { getBills, addBill, removeLastBill, clearBills, initializeProducts } from "@/utils/storage";
import { MenuBar } from "@/components/MenuBar";
import { MainContent } from "@/components/MainContent";
import { BottomMenu } from "@/components/BottomMenu";
import { CategoryBar } from "@/components/CategoryBar";

interface IndexProps {
  location: "cantina" | "viva";
}

const CATEGORIES = {
  cantina: ["MENIURI", "BAUTURI", "MIC DEJUN"],
  viva: ["CAFEA", "BAUTURI", "DESERT"],
};

const Index = ({ location }: IndexProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBill, setCurrentBill] = useState<BillItem[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [showBillHistory, setShowBillHistory] = useState(false);
  const [showDailyTotal, setShowDailyTotal] = useState(false);
  const [confirmClearDay, setConfirmClearDay] = useState(false);
  const [confirmDeleteLast, setConfirmDeleteLast] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const initialProducts = storedProducts ? JSON.parse(storedProducts) : initializeProducts(location);
    const filteredProducts = initialProducts.filter(
      (product: Product) => product.location === location
    );
    setProducts(filteredProducts);
    setBills(getBills());
    setSelectedCategory(null);
  }, [location]);

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

  const handleCheckout = () => {
    if (currentBill.length === 0) {
      toast({
        title: "Eroare",
        description: "Nu există produse în bon",
        variant: "destructive",
      });
      return;
    }

    const total = currentBill.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newBill: Bill = {
      id: Date.now().toString(),
      items: currentBill,
      total,
      timestamp: Date.now(),
      location,
    };

    addBill(newBill);
    setBills((prev) => [...prev, newBill]);
    setCurrentBill([]);
    toast({
      title: "Succes",
      description: "Bonul a fost salvat",
    });
  };

  const handleClearDay = () => {
    clearBills();
    setBills([]);
    setConfirmClearDay(false);
    setIsSheetOpen(false);
    toast({
      title: "Succes",
      description: "Ziua fiscală a fost ștearsă",
    });
  };

  const handleDeleteLastBill = () => {
    removeLastBill();
    setBills((prev) => prev.slice(0, -1));
    setConfirmDeleteLast(false);
    setIsSheetOpen(false);
    toast({
      title: "Succes",
      description: "Ultimul bon a fost șters",
    });
  };

  const toggleBillHistory = () => {
    setShowBillHistory(!showBillHistory);
    setIsSheetOpen(false);
  };

  const toggleDailyTotal = () => {
    setShowDailyTotal(!showDailyTotal);
    setIsSheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
        onCheckout={handleCheckout}
        onDeleteLastBill={() => setConfirmDeleteLast(true)}
        onToggleBillHistory={toggleBillHistory}
        onToggleDailyTotal={toggleDailyTotal}
        onClearDay={() => setConfirmClearDay(true)}
        showBillHistory={showBillHistory}
        showDailyTotal={showDailyTotal}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        location={location}
      />

      <ConfirmDialog
        isOpen={confirmClearDay}
        onConfirm={handleClearDay}
        onCancel={() => setConfirmClearDay(false)}
        title="Confirmare"
        description="Ești sigur că vrei să ștergi ziua fiscală?"
      />

      <ConfirmDialog
        isOpen={confirmDeleteLast}
        onConfirm={handleDeleteLastBill}
        onCancel={() => setConfirmDeleteLast(false)}
        title="Confirmare"
        description="Ești sigur că vrei să ștergi ultimul bon?"
      />
    </div>
  );
};

export default Index;
