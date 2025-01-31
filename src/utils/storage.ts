import { Product } from "@/types";

export const initializeProducts = () => {
  const existingProducts = localStorage.getItem("products");
  if (!existingProducts) {
    const initialProducts: Product[] = [
      {
        id: "1737762443341",
        name: "AMERICANO",
        price: 10,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762496397",
        name: "ESPRESSO",
        price: 7,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762513469",
        name: "ESPRESSO MACHIATO",
        price: 7,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762525709",
        name: "ESPRESSO DUBLU",
        price: 12,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762536486",
        name: "DRESSING",
        price: 1,
        location: "cantina",
        category: "MIC DEJUN",
      },
      {
        id: "1737762547709",
        name: "AFFOGATO",
        price: 19,
        location: "viva",
        category: "CAFEA",
      },
      {
        id: "1737762558166",
        name: "FLAT WHITE",
        price: 15,
        location: "viva",
        category: "CAFEA",
      },
      {
        id: "1737762570981",
        name: "FLAT WHITE SOYA/MIGDALE",
        price: 16,
        location: "viva",
        category: "CAFEA",
      },
      {
        id: "1737762587285",
        name: "CAPPUCCINO",
        price: 13,
        location: "viva",
        category: "CAFEA",
      },
      {
        id: "1737762611213",
        name: "CAPPUCCINO LAPTE SOYA/MIGDALE",
        price: 15,
        location: "viva",
        category: "CAFEA",
      },
      {
        id: "1737762632869",
        name: "CAFFE LATTE",
        price: 16,
        location: "viva",
        category: "CAFEA",
      },
      {
        id: "1737762632870",
        name: "CAFFE LATTE SOYA/MIGDALE",
        price: 18,
        location: "viva",
        category: "CAFEA",
      },
    ];
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
};

export const getProducts = (): Product[] => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

export const getBills = () => {
  const bills = localStorage.getItem("bills");
  return bills ? JSON.parse(bills) : [];
};

export const addBill = (bill) => {
  const bills = getBills();
  localStorage.setItem("bills", JSON.stringify([...bills, bill]));
};

export const removeLastBill = () => {
  const bills = getBills();
  bills.pop();
  localStorage.setItem("bills", JSON.stringify(bills));
};

export const clearBills = () => {
  localStorage.removeItem("bills");
};