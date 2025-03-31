
import { useState } from "react";
import { Product, OrderItem } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Edit, Save, CircleCheck, CircleX, Plus, Minus } from "lucide-react";
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
  const hasOrder = orderItem !== undefined && orderItem.count > 0;
  const currentCount = orderItem?.count || 0;

  const handleAddToOrder = () => {
    onUpdate(product.id, currentCount + 1);
  };

  const handleRemoveFromOrder = () => {
    if (currentCount > 0) {
      onUpdate(product.id, currentCount - 1);
    }
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
        <div className="py-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Cantitate comandată:</span>
            <span className="font-bold text-lg">{currentCount}</span>
          </div>
          {orderItem?.lastUpdated && (
            <div className="text-xs text-gray-500 mt-2">
              Ultima actualizare: {formatOrderDate(orderItem.lastUpdated)}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 flex gap-2">
        <Button 
          onClick={handleAddToOrder} 
          variant="default"
          className="flex-1"
        >
          <Plus className="mr-2 h-4 w-4" />
          {hasOrder ? "Adaugă încă" : "Adaugă la comandă"}
        </Button>
        {hasOrder && (
          <Button 
            onClick={handleRemoveFromOrder} 
            variant="outline"
            className="flex-1"
          >
            <Minus className="mr-2 h-4 w-4" />
            Elimină
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
