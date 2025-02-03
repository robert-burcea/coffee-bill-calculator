import { Button } from "@/components/ui/button";
import { Menu, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface BottomMenuProps {
  onCheckout: () => void;
  onDeleteLastBill: () => void;
  onToggleBillHistory: () => void;
  onToggleDailyTotal: () => void;
  onClearDay: () => void;
  showBillHistory: boolean;
  showDailyTotal: boolean;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  location: "cantina" | "viva";
}

export const BottomMenu = ({
  onCheckout,
  onDeleteLastBill,
  onToggleBillHistory,
  onToggleDailyTotal,
  onClearDay,
  showBillHistory,
  showDailyTotal,
  isSheetOpen,
  setIsSheetOpen,
  location,
}: BottomMenuProps) => {
  const navigate = useNavigate();
  const targetLocation = location === "cantina" ? "viva" : "cantina";

  const handleDeleteLastBill = () => {
    setIsSheetOpen(false);
    onDeleteLastBill();
  };

  const handleClearDay = () => {
    setIsSheetOpen(false);
    onClearDay();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
        <Button
          onClick={onCheckout}
          className="bg-green-500 hover:bg-green-600 h-14 px-8 text-lg font-medium"
        >
          Achita
        </Button>
        <Button
          onClick={onToggleDailyTotal}
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
                    navigate(`/${targetLocation}`);
                    setIsSheetOpen(false);
                  }}
                  variant="outline"
                  className="w-full h-14 text-lg font-medium gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  {targetLocation.toUpperCase()}
                </Button>
                <Button
                  onClick={handleDeleteLastBill}
                  variant="outline"
                  className="w-full h-14 text-lg font-medium"
                >
                  Sterge ultimul bon
                </Button>
                <Button
                  onClick={onToggleBillHistory}
                  variant={showBillHistory ? "default" : "outline"}
                  className={cn(
                    "w-full h-14 text-lg font-medium",
                    showBillHistory && "bg-blue-500 hover:bg-blue-600"
                  )}
                >
                  Evidenta bonuri
                </Button>
                <Button
                  onClick={handleClearDay}
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
            onClick={handleDeleteLastBill}
            variant="outline"
            className="h-14 px-8 text-lg font-medium"
          >
            Sterge ultimul bon
          </Button>
          <Button
            onClick={onToggleBillHistory}
            variant={showBillHistory ? "default" : "outline"}
            className={cn(
              "h-14 px-8 text-lg font-medium",
              showBillHistory && "bg-blue-500 hover:bg-blue-600"
            )}
          >
            Evidenta bonuri
          </Button>
          <Button
            onClick={handleClearDay}
            variant="outline"
            className="h-14 px-8 text-lg font-medium text-red-500 hover:text-red-700"
          >
            Sterge zi
          </Button>
        </div>
      </div>
    </div>
  );
};