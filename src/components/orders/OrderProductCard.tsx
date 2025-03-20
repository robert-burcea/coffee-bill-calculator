
import { useState } from "react";
import { Product, OrderItem } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, CircleCheck, CircleX, ShoppingCart } from "lucide-react";
import { formatOrderDate } from "@/utils/orders";

interface OrderProductCardProps {
  product: Product;
  orderItem?: OrderItem;
  onUpdate: (productId: string, count: number) => void;
}

export const OrderProductCard = ({ 
  product, 
  orderItem, 
  onUpdate 
}: OrderProductCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [count, setCount] = useState(orderItem?.count || 0);
  const hasOrder = orderItem !== undefined && orderItem.count > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(product.id, count);
    setIsEditing(false);
  };

  return (
    <Card className={hasOrder ? "border-green-500" : "border-gray-200"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="mt-1">
            {hasOrder ? (
              <CircleCheck className="h-5 w-5 text-green-500" />
            ) : (
              <CircleX className="h-5 w-5 text-gray-500" />
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
              <Label htmlFor={`count-${product.id}`}>Cantitate comandată:</Label>
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
              <span className="font-medium">Cantitate comandată:</span>
              <span className="font-bold text-lg">{hasOrder ? orderItem?.count : ""}</span>
            </div>
            {orderItem?.lastUpdated && (
              <div className="text-xs text-gray-500 mt-2">
                Ultima actualizare: {formatOrderDate(orderItem.lastUpdated)}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        {isEditing ? (
          <Button onClick={handleSubmit} variant="default" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Salvează
          </Button>
        ) : (
          <Button 
            onClick={() => setIsEditing(true)} 
            variant={hasOrder ? "outline" : "default"}
            className="w-full"
          >
            <Edit className="mr-2 h-4 w-4" />
            {hasOrder ? "Editează" : "Adaugă la comandă"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
