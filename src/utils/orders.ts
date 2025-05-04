
import { OrderData, OrderItem, Product } from "@/types";
import { getProducts } from "./storage";
import * as XLSX from 'xlsx';

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

// Export orders data as XLSX
export const exportOrdersAsCSV = (location: "cantina" | "viva", category?: string): void => {
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
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  Object.keys(categorizedProducts).forEach(category => {
    if (categorizedProducts[category].length === 0) return; // Skip empty categories
    
    // Create data for this category sheet
    const data = [
      ["Nume Produs", "Cantitate Comandata"] // Simplified columns
    ];
    
    categorizedProducts[category].forEach(product => {
      const orderItem = orders[product.id];
      if (!orderItem || orderItem.count <= 0) return;
      
      data.push([
        product.name,
        orderItem.count
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
    ? `comanda_${location}_${category}_${today}.xlsx`
    : `comanda_${location}_${today}.xlsx`;
    
  XLSX.writeFile(wb, filename);
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
