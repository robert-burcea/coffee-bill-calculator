import { useEffect, useState } from "react";
import { Product, BillItem } from "@/types";
import { getProducts, initializeProducts } from "@/utils/storage";

interface ProductManagerProps {
  location: "cantina" | "viva";
  onProductsLoaded: (products: Product[]) => void;
}

export const ProductManager = ({ location, onProductsLoaded }: ProductManagerProps) => {
  useEffect(() => {
    const storedProducts = localStorage.getItem(`${location}_products`);
    const initialProducts = storedProducts
      ? JSON.parse(storedProducts)
      : initializeProducts(location);
    const filteredProducts = initialProducts.filter(
      (product: Product) => product.location === location
    );
    onProductsLoaded(filteredProducts);
  }, [location, onProductsLoaded]);

  return null;
};