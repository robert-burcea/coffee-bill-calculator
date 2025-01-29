import { Button } from "@/components/ui/button";
import { ProductManagement } from "@/components/ProductManagement";
import { Product } from "@/types";

interface MenuBarProps {
  location: "cantina" | "viva";
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export const MenuBar = ({ location, products, onProductsChange }: MenuBarProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{location.toUpperCase()}</h1>
      <ProductManagement
        location={location}
        products={products}
        onProductsChange={onProductsChange}
      />
    </div>
  );
};