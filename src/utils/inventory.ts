
import { InventoryData, InventoryItem, Product } from "@/types";
import { getProducts } from "./storage";

// Get inventory for a specific location
export const getInventory = (location: "cantina" | "viva"): InventoryData => {
  const key = `${location}_inventory`;
  const inventory = localStorage.getItem(key);
  return inventory ? JSON.parse(inventory) : {};
};

// Save the entire inventory for a location
export const saveInventory = (location: "cantina" | "viva", inventory: InventoryData): void => {
  const key = `${location}_inventory`;
  localStorage.setItem(key, JSON.stringify(inventory));
};

// Update a single product's inventory
export const updateProductInventory = (
  location: "cantina" | "viva",
  productId: string,
  count: number
): void => {
  const inventory = getInventory(location);
  
  inventory[productId] = {
    productId,
    count,
    lastUpdated: Date.now(),
  };
  
  saveInventory(location, inventory);
};

// Get a count of how many products need inventory
export const getInventoryStatus = (location: "cantina" | "viva", category?: string): { total: number; completed: number } => {
  const allProducts = getProducts(location).filter(p => !p.hidden && p.location === location);
  
  // Filter by category if specified
  const products = category 
    ? allProducts.filter(p => p.category === category)
    : allProducts;
    
  const inventory = getInventory(location);
  
  const total = products.length;
  // Only count completed items that are part of the current category filter
  const completed = products.filter(p => inventory[p.id] !== undefined).length;
  
  return { total, completed };
};

// Check if a product was inventoried today
export const wasInventoriedToday = (item?: InventoryItem): boolean => {
  if (!item) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastUpdated = new Date(item.lastUpdated);
  lastUpdated.setHours(0, 0, 0, 0);
  
  return today.getTime() === lastUpdated.getTime();
};

// Format date for display
export const formatInventoryDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Export inventory data as CSV grouped by category
export const exportInventoryAsCSV = (location: "cantina" | "viva", category?: string): string => {
  const allProducts = getProducts(location).filter(p => !p.hidden && p.location === location);
  
  // Filter by category if specified
  const products = category 
    ? allProducts.filter(p => p.category === category)
    : allProducts;
    
  const inventory = getInventory(location);
  
  // Group products by category
  const categorizedProducts: Record<string, Product[]> = {};
  
  products.forEach(product => {
    if (!categorizedProducts[product.category]) {
      categorizedProducts[product.category] = [];
    }
    categorizedProducts[product.category].push(product);
  });
  
  // Create CSV with category headers
  let csv = "";
  
  Object.keys(categorizedProducts).forEach(category => {
    csv += `CATEGORIE: ${category}\n`;
    csv += "Nume Produs,Cod Produs,Cod Identificare,Producător,Categorie,Pret,Cantitate,Data Actualizare\n";
    
    categorizedProducts[category].forEach(product => {
      const inventoryItem = inventory[product.id];
      const count = inventoryItem ? inventoryItem.count : 0;
      const lastUpdated = inventoryItem 
        ? formatInventoryDate(inventoryItem.lastUpdated) 
        : "Neinventariat";
      
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

// Reset inventory for a location
export const resetInventory = (location: "cantina" | "viva"): void => {
  saveInventory(location, {});
};

// Check if inventory needs to be reset (new day)
export const checkAndResetInventory = (location: "cantina" | "viva"): void => {
  const lastReset = localStorage.getItem(`${location}_inventory_last_reset`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!lastReset || new Date(parseInt(lastReset)).getTime() < today.getTime()) {
    resetInventory(location);
    localStorage.setItem(`${location}_inventory_last_reset`, today.getTime().toString());
  }
};
