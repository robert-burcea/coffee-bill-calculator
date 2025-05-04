
import { useState } from "react";
import { Product, InventoryItem } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, CircleCheck, CircleX, Plus } from "lucide-react";
import { wasInventoriedToday, formatInventoryDate } from "@/utils/inventory";

interface InventoryProductCardProps {
  product: Product;
  inventoryItem?: InventoryItem;
  onUpdate: (productId: string, count: number) => void;
}

export const InventoryProductCard = ({ 
  product, 
  inventoryItem, 
  onUpdate 
}: InventoryProductCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [count, setCount] = useState(inventoryItem?.count || 0);
  const isInventoriedToday = wasInventoriedToday(inventoryItem);
  const currentCount = inventoryItem?.count || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(product.id, count);
    setIsEditing(false);
  };

  const handleAddMore = () => {
    const additionalAmount = window.prompt("Cantitatea adăugată:", "1");
    if (additionalAmount !== null) {
      const amount = parseInt(additionalAmount);
      if (!isNaN(amount) && amount > 0) {
        onUpdate(product.id, currentCount + amount);
      }
    }
  };

  return (
    <Card className={isInventoriedToday ? "border-green-500" : "border-red-200"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="mt-1">
            {isInventoriedToday ? (
              <CircleCheck className="h-5 w-5 text-green-500" />
            ) : (
              <CircleX className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        {product.barcode && (
          <p className="text-xs text-gray-400">Cod: {product.barcode}</p>
        )}
        {product.identificationCode && (
          <p className="text-xs text-gray-400">Cod Identificare: {product.identificationCode}</p>
        )}
        {product.producer && (
          <p className="text-xs text-gray-400">Producător: {product.producer}</p>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <Label htmlFor={`count-${product.id}`}>Cantitate:</Label>
              <Input
                id={`count-${product.id}`}
                type="number"
                min="0"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                className="text-lg"
                autoFocus
              />
            </div>
          </form>
        ) : (
          <div className="py-2">
            <div className="flex justify-between">
              <span className="font-medium">Cantitate:</span>
              <span className="font-bold text-lg">{inventoryItem?.count || 0}</span>
            </div>
            {inventoryItem?.lastUpdated && (
              <div className="text-xs text-gray-500 mt-2">
                Ultima actualizare: {formatInventoryDate(inventoryItem.lastUpdated)}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4 flex gap-2">
        {isEditing ? (
          <Button onClick={handleSubmit} variant="default" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Salvează
          </Button>
        ) : (
          <>
            <Button 
              onClick={() => setIsEditing(true)} 
              variant={isInventoriedToday ? "outline" : "default"}
              className="flex-1"
            >
              <Edit className="mr-2 h-4 w-4" />
              {isInventoriedToday ? "Editează" : "Adaugă inventar"}
            </Button>
            {isInventoriedToday && (
              <Button 
                onClick={handleAddMore} 
                variant="secondary" 
                className="flex-1"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adaugă
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};
