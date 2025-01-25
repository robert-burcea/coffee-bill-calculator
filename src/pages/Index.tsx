import { useEffect, useState } from "react";
import { Product, BillItem, Bill } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";
import { CurrentBill } from "@/components/CurrentBill";
import { BillHistory } from "@/components/BillHistory";
import { DailyTotal } from "@/components/DailyTotal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  getProducts,
  getBills,
  addBill,
  removeLastBill,
  clearBills,
  initializeProducts,
} from "@/utils/storage";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBill, setCurrentBill] = useState<BillItem[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [showBillHistory, setShowBillHistory] = useState(false);
  const [showDailyTotal, setShowDailyTotal] = useState(false);
  const [confirmClearDay, setConfirmClearDay] = useState(false);
  const [confirmDeleteLast, setConfirmDeleteLast] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initializeProducts();
    setProducts(getProducts());
    setBills(getBills());
  }, []);

  const handleProductClick = (product: Product) => {
    setCurrentBill((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id
      );
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
    toast({
      title: "Succes",
      description: "Ziua fiscală a fost ștearsă",
    });
  };

  const handleDeleteLastBill = () => {
    removeLastBill();
    setBills((prev) => prev.slice(0, -1));
    setConfirmDeleteLast(false);
    toast({
      title: "Succes",
      description: "Ultimul bon a fost șters",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Calculator Preț</h1>
          <div className="flex gap-2">
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Meniu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-2">
                    <Button
                      onClick={() => setConfirmDeleteLast(true)}
                      variant="outline"
                      className="w-full"
                    >
                      Sterge ultimul bon
                    </Button>
                    <Button
                      onClick={() => setShowBillHistory(true)}
                      variant="outline"
                      className="w-full"
                    >
                      Evidenta bonuri
                    </Button>
                    <Button
                      onClick={() => setConfirmClearDay(true)}
                      variant="outline"
                      className="w-full text-red-500 hover:text-red-700"
                    >
                      Sterge zi
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600"
            >
              Achita
            </Button>
            <Button
              onClick={() => setShowDailyTotal((prev) => !prev)}
              variant="outline"
            >
              Total zi
            </Button>
            <div className="hidden md:flex gap-2">
              <Button
                onClick={() => setConfirmDeleteLast(true)}
                variant="outline"
              >
                Sterge ultimul bon
              </Button>
              <Button
                onClick={() => setShowBillHistory(true)}
                variant="outline"
              >
                Evidenta bonuri
              </Button>
              <Button
                onClick={() => setConfirmClearDay(true)}
                variant="outline"
                className="text-red-500 hover:text-red-700"
              >
                Sterge zi
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div>
            <ProductGrid
              products={products}
              currentBill={currentBill}
              onProductClick={handleProductClick}
            />
          </div>
          <div className="space-y-4">
            <CurrentBill
              items={currentBill}
              onRemoveItem={handleRemoveItem}
            />
            {showDailyTotal && <DailyTotal bills={bills} />}
            {showBillHistory && <BillHistory bills={bills} />}
          </div>
        </div>

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
    </div>
  );
};

export default Index;