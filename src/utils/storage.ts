import { Product, Bill } from "@/types";

const PRODUCTS_KEY = "products";
const BILLS_KEY = "bills";

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const setProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getBills = (): Bill[] => {
  const stored = localStorage.getItem(BILLS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const setBills = (bills: Bill[]) => {
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
};

export const addBill = (bill: Bill) => {
  const bills = getBills();
  bills.push(bill);
  setBills(bills);
};

export const removeLastBill = () => {
  const bills = getBills();
  bills.pop();
  setBills(bills);
};

export const clearBills = () => {
  setBills([]);
};

// Initialize products if empty
export const initializeProducts = () => {
  const products = getProducts();
  if (products.length === 0) {
    const initialProducts = [
      { id: "1737762443341", name: "AMERICANO", price: 10 },
      { id: "1737762496397", name: "ESPRESSO", price: 7 },
      { id: "1737762513469", name: "ESPRESSO MACHIATO", price: 7 },
      { id: "1737762525709", name: "ESPRESSO DUBLU", price: 12 },
      { id: "1737762536486", name: "DRESSING", price: 1 },
      { id: "1737762547709", name: "AFFOGATO", price: 19 },
      { id: "1737762558166", name: "FLAT WHITE", price: 15 },
      { id: "1737762570981", name: "FLAT WHITE SOYA/MIGDALE", price: 16 },
      { id: "1737762587285", name: "CAPPUCCINO", price: 13 },
      { id: "1737762611213", name: "CAPPUCCINO LAPTE SOYA/MIGDALE", price: 15 },
      { id: "1737762632869", name: "CAFFE LATTE", price: 16 },
      { id: "1737762632869", name: "CAFFE LATTE SOYA/MIGDALE", price: 18 },
      { id: "1737762712182", name: "LONG BLACK", price: 12 },
      { id: "1737762720989", name: "CIOCOLATA CALDA", price: 12 },
      { id: "1737762729965", name: "CEAI", price: 7 },
      { id: "1737762740318", name: "FRAPPE", price: 20 },
      { id: "1737762755263", name: "ICED COFFEE SOYA/MIGDALE", price: 18 },
      { id: "1737762805534", name: "TOPPING", price: 2 },
      { id: "1737762812054", name: "SINGLE ORIGIN COFFEE", price: 3 },
      { id: "1737762821655", name: "SIROP 250ml", price: 27 },
      { id: "1737762837542", name: "CAFEA ETHIOPIA", price: 45 },
      { id: "1737762844918", name: "CAFEA COLUMBIA", price: 45 },
      { id: "1737762861942", name: "COLUMBIA DECOF", price: 57 },
      { id: "1737762869630", name: "CAFEA COSTARICA", price: 45 },
      { id: "1737762877174", name: "CAFEA BRAZILIA", price: 39 }
    ];
    setProducts(initialProducts);
  }
};