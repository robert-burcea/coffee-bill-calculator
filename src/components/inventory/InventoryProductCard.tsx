
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product, InventoryItem } from "@/types";
import { wasInventoriedToday, formatInventoryDate } from "@/utils/inventory";
import { Edit, Plus } from "lucide-react";

interface InventoryProductCardProps {
  product: Product;
  inventoryItem?: InventoryItem;
  onUpdate: (productId: string, count: number) => void;
  onAdd?: (productId: string, additionalCount: number) => void;
}

export const InventoryProductCard: React.FC<InventoryProductCardProps> = ({
  product,
  inventoryItem,
  onUpdate,
  onAdd
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [count, setCount] = useState(inventoryItem?.count || 0);
  const [additionalCount, setAdditionalCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  
  // Update local count when inventoryItem changes
  useEffect(() => {
    setCount(inventoryItem?.count || 0);
  }, [inventoryItem]);

  const handleSave = () => {
    onUpdate(product.id, count);
    setIsEditing(false);
  };
  
  const handleAddToInventory = () => {
    if (onAdd && additionalCount > 0) {
      onAdd(product.id, additionalCount);
      setIsAdding(false);
      setAdditionalCount(0);
    }
  };

  const handleCancel = () => {
    setCount(inventoryItem?.count || 0);
    setIsEditing(false);
  };
  
  const handleCancelAdd = () => {
    setAdditionalCount(0);
    setIsAdding(false);
  };

  const isInventoried = wasInventoriedToday(inventoryItem);

  return (
    <Card className={`p-4 ${isInventoried ? "border-green-500" : "border-gray-200"}`}>
      <h3 className="text-lg font-medium mb-1 truncate" title={product.name}>
        {product.name}
      </h3>
      
      <div className="text-sm text-gray-500 mb-4">
        {product.barcode && <p>Cod de bare: {product.barcode}</p>}
        {product.identificationCode && <p>Cod de identificare: {product.identificationCode}</p>}
        {product.producer && <p>Producător: {product.producer}</p>}
      </div>
      
      {!isEditing && !isAdding && (
        <div className="flex items-center justify-between">
          <div>
            {inventoryItem ? (
              <>
                <p className="font-semibold">{inventoryItem.count} buc</p>
                <p className="text-xs text-gray-500">
                  Actualizat: {formatInventoryDate(inventoryItem.lastUpdated)}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Neinventariat</p>
            )}
          </div>
          <div className="flex gap-2">
            {inventoryItem && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Adaugă
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-1" />
              {inventoryItem ? "Editează" : "Adaugă"}
            </Button>
          </div>
        </div>
      )}
      
      {isEditing && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              min="0"
              autoFocus
            />
            <span>buc</span>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Anulează
            </Button>
            <Button size="sm" onClick={handleSave}>
              Salvează
            </Button>
          </div>
        </div>
      )}
      
      {isAdding && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Input
              type="number"
              value={additionalCount}
              onChange={(e) => setAdditionalCount(parseInt(e.target.value) || 0)}
              min="1"
              autoFocus
              placeholder="Cantitate adițională"
            />
            <span>buc</span>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancelAdd}>
              Anulează
            </Button>
            <Button size="sm" onClick={handleAddToInventory} disabled={additionalCount <= 0}>
              Adaugă la inventar
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
