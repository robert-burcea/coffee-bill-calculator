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
import { Menu, ScrollText } from "lucide-react";
import {
  getProducts,
  getBills,
  addBill,
  removeLastBill,
  clearBills,
  initializeProducts,
} from "@/utils/storage";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface IndexProps {
  location: "cantina" | "viva";
}

const Index = ({ location }: IndexProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBill, setCurrentBill] = useState<BillItem[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [showBillHistory, setShowBillHistory] = useState(false);
  const [showDailyTotal, setShowDailyTotal] = useState(false);
  const [confirmClearDay, setConfirmClearDay] = useState(false);
  const [confirmDeleteLast, setConfirmDeleteLast] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Spoonful - {location.toUpperCase()}</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-gray-600"
          >
            Schimbă locația
          </Button>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6 mb-20">
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

      {/* Fixed bottom menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <Button
            onClick={handleCheckout}
            className="bg-green-500 hover:bg-green-600 h-14 px-8 text-lg font-medium"
          >
            Achita
          </Button>
          <Button
            onClick={toggleDailyTotal}
            variant={showDailyTotal ? "default" : "outline"}
            className={cn(
              "h-14 px-8 text-lg font-medium",
              showDailyTotal && "bg-blue-500 hover:bg-blue-600"
            )}
          >
            Total zi
          </Button>
          <div className="block md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-14 w-14">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Meniu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-2">
                  <Button
                    onClick={() => {
                      setConfirmDeleteLast(true);
                      setIsSheetOpen(false);
                    }}
                    variant="outline"
                    className="w-full h-14 text-lg font-medium"
                  >
                    Sterge ultimul bon
                  </Button>
                  <Button
                    onClick={() => {
                      toggleBillHistory();
                      setIsSheetOpen(false);
                    }}
                    variant={showBillHistory ? "default" : "outline"}
                    className={cn(
                      "w-full h-14 text-lg font-medium",
                      showBillHistory && "bg-blue-500 hover:bg-blue-600"
                    )}
                  >
                    Evidenta bonuri
                  </Button>
                  <Button
                    onClick={() => {
                      setConfirmClearDay(true);
                      setIsSheetOpen(false);
                    }}
                    variant="outline"
                    className="w-full h-14 text-lg font-medium text-red-500 hover:text-red-700"
                  >
                    Sterge zi
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              onClick={() => setConfirmDeleteLast(true)}
              variant="outline"
              className="h-14 px-8 text-lg font-medium"
            >
              Sterge ultimul bon
            </Button>
            <Button
              onClick={toggleBillHistory}
              variant={showBillHistory ? "default" : "outline"}
              className={cn(
                "h-14 px-8 text-lg font-medium",
                showBillHistory && "bg-blue-500 hover:bg-blue-600"
              )}
            >
              Evidenta bonuri
            </Button>
            <Button
              onClick={() => setConfirmClearDay(true)}
              variant="outline"
              className="h-14 px-8 text-lg font-medium text-red-500 hover:text-red-700"
            >
              Sterge zi
            </Button>
          </div>
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
  );
};

export default Index;
