
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
export const getInventoryStatus = (location: "cantina" | "viva"): { total: number; completed: number } => {
  const products = getProducts(location).filter(p => !p.hidden && p.location === location);
  const inventory = getInventory(location);
  
  const total = products.length;
  const completed = Object.keys(inventory).length;
  
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

// Export inventory data as CSV
export const exportInventoryAsCSV = (location: "cantina" | "viva"): string => {
  const products = getProducts(location).filter(p => !p.hidden && p.location === location);
  const inventory = getInventory(location);
  
  // Create CSV header
  let csv = "Nume Produs,Cod Produs,Categorie,Pret,Cantitate,Data Actualizare\n";
  
  // Add each product
  products.forEach(product => {
    const inventoryItem = inventory[product.id];
    const count = inventoryItem ? inventoryItem.count : 0;
    const lastUpdated = inventoryItem 
      ? formatInventoryDate(inventoryItem.lastUpdated) 
      : "Neinventariat";
    
    csv += `"${product.name}","${product.barcode || ''}","${product.category}",${product.price},${count},"${lastUpdated}"\n`;
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
  URL.revoObjectURL(a.href);
};
