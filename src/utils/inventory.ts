import { InventoryData, InventoryItem, Product } from "@/types";
import { getProducts } from "./storage";
import * as XLSX from 'xlsx';

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

// Add quantity to an existing inventory item
export const addToProductInventory = (
  location: "cantina" | "viva", 
  productId: string,
  additionalCount: number
): void => {
  const inventory = getInventory(location);
  
  if (inventory[productId]) {
    inventory[productId] = {
      productId,
      count: inventory[productId].count + additionalCount,
      lastUpdated: Date.now(),
    };
  } else {
    inventory[productId] = {
      productId,
      count: additionalCount,
      lastUpdated: Date.now(),
    };
  }
  
  saveInventory(location, inventory);
};

// Get a count of how many products need inventory
export const getInventoryStatus = (location: "cantina" | "viva", category?: string): { total: number; completed: number } => {
  const allProducts = getProducts(location).filter(p => !p.hidden && p.location === location);
  
  // Filter by category if specified
  const products = category 
    ? allProducts.filter(p => p.category === category.toUpperCase())
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

// Export inventory data as XLSX with only product name and quantity
export const exportInventoryAsCSV = (location: "cantina" | "viva", category?: string): void => {
  const allProducts = getProducts(location).filter(p => !p.hidden && p.location === location);
  
  // Filter by category if specified
  const products = category 
    ? allProducts.filter(p => p.category === category.toUpperCase())
    : allProducts;
    
  const inventory = getInventory(location);
  
  // Group products by category
  const categorizedProducts: Record<string, Product[]> = {};
  
  products.forEach(product => {
    // Only include products with inventory count > 0
    const inventoryItem = inventory[product.id];
    if (!inventoryItem || inventoryItem.count <= 0) return;
    
    if (!categorizedProducts[product.category]) {
      categorizedProducts[product.category] = [];
    }
    categorizedProducts[product.category].push(product);
  });
  
  // Create workbook with simplified data (only product name and quantity)
  const wb = XLSX.utils.book_new();
  
  Object.keys(categorizedProducts).forEach(category => {
    if (categorizedProducts[category].length === 0) return; // Skip empty categories
    
    // Create data for this category sheet
    const data = [
      ["Nume Produs", "Cantitate"] // Only two columns as requested
    ];
    
    categorizedProducts[category].forEach(product => {
      const inventoryItem = inventory[product.id];
      if (!inventoryItem || inventoryItem.count <= 0) return;
      
      data.push([
        product.name,
        inventoryItem.count
      ]);
    });
    
    // Only create sheet if there's data beyond the header
    if (data.length > 1) {
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Adjust column widths
      const colWidths = [
        { wch: 40 }, // Product name
        { wch: 10 }  // Quantity
      ];
      
      ws['!cols'] = colWidths;
      
      // Add sheet to workbook (clean category name for sheet name)
      const safeSheetName = category.replace(/[\\/*[\]?:]/g, '_').substring(0, 31);
      XLSX.utils.book_append_sheet(wb, ws, safeSheetName);
    }
  });
  
  // Generate Excel file and trigger download
  const today = new Date().toISOString().split('T')[0];
  const filename = category 
    ? `inventar_${location}_${category}_${today}.xlsx`
    : `inventar_${location}_${today}.xlsx`;
    
  XLSX.writeFile(wb, filename);
};

// Download a file (not needed for XLSX since XLSX.writeFile handles this)
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
