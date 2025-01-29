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
        category: "DIVERSE",
      },
      {
        id: "1737762547709",
        name: "AFFOGATO",
        price: 19,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762558166",
        name: "FLAT WHITE",
        price: 15,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762570981",
        name: "FLAT WHITE SOYA/MIGDALE",
        price: 16,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762587285",
        name: "CAPPUCCINO",
        price: 13,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762611213",
        name: "CAPPUCCINO LAPTE SOYA/MIGDALE",
        price: 15,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762632869",
        name: "CAFFE LATTE",
        price: 16,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762632870", // Changed ID to be unique
        name: "CAFFE LATTE SOYA/MIGDALE",
        price: 18,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762712182",
        name: "LONG BLACK",
        price: 12,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762720989",
        name: "CIOCOLATA CALDA",
        price: 12,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762729965",
        name: "CEAI",
        price: 7,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762740318",
        name: "FRAPPE",
        price: 20,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762755263",
        name: "ICED COFFEE SOYA/MIGDALE",
        price: 18,
        location: "viva",
        category: "BAUTURI",
      },
      {
        id: "1737762805534",
        name: "TOPPING",
        price: 2,
        location: "cantina",
        category: "DIVERSE",
      },
      {
        id: "1737762812054",
        name: "SINGLE ORIGIN COFFEE",
        price: 3,
        location: "cantina",
        category: "BAUTURI",
      },
      {
        id: "1737762837542",
        name: "BISCUITI",
        price: 7.53,
        location: "cantina",
        category: "DIVERSE",
      },
      {
        id: "1737762844918",
        name: "COOKIES",
        price: 6,
        location: "cantina",
        category: "DIVERSE",
      },
      {
        id: "1737762861942",
        name: "PANDISPAN VEGAN",
        price: 6,
        location: "cantina",
        category: "DIVERSE",
      },
      {
        id: "1737762869630",
        name: "CARROT CAKE",
        price: 6,
        location: "cantina",
        category: "DIVERSE",
      },
      {
        id: "1737762877174",
        name: "BROWNIE SIMPLU",
        price: 10,
        location: "cantina",
        category: "DIVERSE",
      },
      {
        id: "1737962877174",
        name: "BROWNIE CU PERE",
        price: 12,
        location: "cantina",
        category: "DIVERSE",
      },
    ];
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
};

export const getProducts = (): Product[] => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

export const getCategories = (location: "cantina" | "viva"): string[] => {
  const products = getProducts();
  const categories = new Set(
    products
      .filter((product) => product.location === location)
      .map((product) => product.category)
  );
  return Array.from(categories);
};

export const addCategory = (category: string, location: "cantina" | "viva") => {
  // Categories are derived from products, so we don't need to store them separately
  // This function is here for future use if needed
};

export const removeCategory = (category: string, location: "cantina" | "viva") => {
  const products = getProducts();
  const updatedProducts = products.filter(
    (product) =>
      !(product.category === category && product.location === location)
  );
  localStorage.setItem("products", JSON.stringify(updatedProducts));
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
