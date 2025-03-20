
import { OrderData, OrderItem, Product } from "@/types";
import { getProducts } from "./storage";

// Get orders for a specific location
export const getOrders = (location: "cantina" | "viva"): OrderData => {
  const key = `${location}_orders`;
  const orders = localStorage.getItem(key);
  return orders ? JSON.parse(orders) : {};
};

// Save the entire orders for a location
export const saveOrders = (location: "cantina" | "viva", orders: OrderData): void => {
  const key = `${location}_orders`;
  localStorage.setItem(key, JSON.stringify(orders));
};

// Update a single product's order
export const updateProductOrder = (
  location: "cantina" | "viva",
  productId: string,
  count: number
): void => {
  const orders = getOrders(location);
  
  orders[productId] = {
    productId,
    count,
    lastUpdated: Date.now(),
  };
  
  saveOrders(location, orders);
};

// Get a count of how many products have orders
export const getOrdersStatus = (location: "cantina" | "viva", category?: string): { total: number; completed: number } => {
  const allProducts = getProducts(location).filter(p => !p.hidden && p.location === location);
  
  // Filter by category if specified
  const products = category 
    ? allProducts.filter(p => p.category === category)
    : allProducts;
    
  const orders = getOrders(location);
  
  const total = products.length;
  // Only count completed items that are part of the current category filter
  const completed = products.filter(p => orders[p.id] !== undefined).length;
  
  return { total, completed };
};

// Format date for display
export const formatOrderDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Export orders data as CSV grouped by category
export const exportOrdersAsCSV = (location: "cantina" | "viva", category?: string): string => {
  const allProducts = getProducts(location).filter(p => !p.hidden && p.location === location);
  
  // Filter by category if specified
  const products = category 
    ? allProducts.filter(p => p.category === category)
    : allProducts;
    
  const orders = getOrders(location);
  
  // Group products by category
  const categorizedProducts: Record<string, Product[]> = {};
  
  products.forEach(product => {
    // Only include products with order count > 0
    const orderItem = orders[product.id];
    if (!orderItem || orderItem.count <= 0) return;
    
    if (!categorizedProducts[product.category]) {
      categorizedProducts[product.category] = [];
    }
    categorizedProducts[product.category].push(product);
  });
  
  // Create CSV with category headers
  let csv = "";
  
  Object.keys(categorizedProducts).forEach(category => {
    if (categorizedProducts[category].length === 0) return; // Skip empty categories
    
    csv += `CATEGORIE: ${category}\n`;
    csv += "Nume Produs,Cod Produs,Cod Identificare,Producător,Categorie,Pret,Cantitate Comandata,Data Actualizare\n";
    
    categorizedProducts[category].forEach(product => {
      const orderItem = orders[product.id];
      if (!orderItem || orderItem.count <= 0) return; // Extra check
      
      const count = orderItem.count;
      const lastUpdated = formatOrderDate(orderItem.lastUpdated);
      
      csv += `"${product.name}","${product.barcode || ''}","${product.identificationCode || ''}","${product.producer || ''}","${product.category}",${product.price},${count},"${lastUpdated}"\n`;
    });
    
    csv += "\n"; // Add empty line between categories
  });
  
  return csv;
};

// Download a file (CSV/PDF)
export const downloadFile = (content: string, fileName: string, contentType: string): void => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
};

// Reset orders for a location
export const resetOrders = (location: "cantina" | "viva"): void => {
  saveOrders(location, {});
};

// Check if orders need to be reset (new day)
export const checkAndResetOrders = (location: "cantina" | "viva"): void => {
  const lastReset = localStorage.getItem(`${location}_orders_last_reset`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!lastReset || new Date(parseInt(lastReset)).getTime() < today.getTime()) {
    resetOrders(location);
    localStorage.setItem(`${location}_orders_last_reset`, today.getTime().toString());
  }
};
