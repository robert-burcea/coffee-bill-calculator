import { useState } from "react";
import { Product, BillItem } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  currentBill: BillItem[];
  onProductClick: (product: Product) => void;
}

export const ProductGrid = ({ products, currentBill, onProductClick }: ProductGridProps) => {
  const getProductQuantity = (product: Product) => {
    return currentBill.reduce((total, item) => {
      if (item.product.id === product.id) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {products.map((product) => {
        const quantity = getProductQuantity(product);
        return (
          <button
            key={product.id}
            onClick={() => onProductClick(product)}
            className={cn(
              "p-4 rounded-lg transition-all duration-200 text-base font-medium text-center relative min-h-[100px]",
              "hover:shadow-md active:scale-95",
              quantity > 0
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {quantity > 0 && (
              <span className="absolute top-2 right-2 bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-sm">
                {quantity}
              </span>
            )}
            <div className="font-bold mb-2">{product.name}</div>
            <div>{product.price} RON</div>
          </button>
        )}
      )}
    </div>
  );
};