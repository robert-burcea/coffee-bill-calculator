import { Bill, Product } from "@/types";

export const getBills = () => {
  const bills = localStorage.getItem("bills");
  return bills ? JSON.parse(bills) : [];
};

export const addBill = (bill: Bill) => {
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

const HIDDEN_CATEGORIES = {
  cantina: ["ASCUNSE"],
  viva: ["ASCUNSE"],
};

export const initializeProducts = (location: "cantina" | "viva") => {
  const vivaProducts: Product[] = [
    {
      id: "1",
      name: "Espresso",
      price: 8,
      category: "CAFEA",
      location: "viva",
      barcode: "123456789",
    },
    {
      id: "2",
      name: "Cappuccino",
      price: 12,
      category: "CAFEA",
      location: "viva",
      barcode: "223456789",
    },
    {
      id: "3",
      name: "Coca Cola",
      price: 7,
      category: "BAUTURI",
      location: "viva",
      barcode: "323456789",
    },
    {
      id: "4",
      name: "Tiramisu",
      price: 15,
      category: "DESERT",
      location: "viva",
      barcode: "423456789",
    },
    {
      id: "hidden1",
      name: "Produs Ascuns",
      price: 10,
      category: "ASCUNSE",
      location: "viva",
      barcode: "999999999",
      hidden: true,
    },
  ];

  const cantinaProducts: Product[] = [
    {
      id: "5",
      name: "Meniu 1",
      price: 25,
      category: "MENIURI",
      location: "cantina",
      barcode: "523456789",
    },
    {
      id: "6",
      name: "Meniu 2",
      price: 28,
      category: "MENIURI",
      location: "cantina",
      barcode: "623456789",
    },
    {
      id: "7",
      name: "Apa plata",
      price: 5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "723456789",
    },
    {
      id: "8",
      name: "Omleta",
      price: 12,
      category: "MIC DEJUN",
      location: "cantina",
      barcode: "823456789",
    },
    {
      id: "hidden2",
      name: "Produs Ascuns Cantina",
      price: 15,
      category: "ASCUNSE",
      location: "cantina",
      barcode: "888888888",
      hidden: true,
    },
  ];

  localStorage.setItem("viva_products", JSON.stringify(vivaProducts));
  localStorage.setItem("cantina_products", JSON.stringify(cantinaProducts));

  return location === "viva" ? vivaProducts : cantinaProducts;
};

export const getProducts = (location: "cantina" | "viva") => {
  const key = `${location}_products`;
  const products = localStorage.getItem(key);
  return products ? JSON.parse(products) : initializeProducts(location);
};

export const addProduct = (product: Product) => {
  const key = `${product.location}_products`;
  const products = getProducts(product.location);
  localStorage.setItem(key, JSON.stringify([...products, product]));
};

export const updateProduct = (product: Product) => {
  const key = `${product.location}_products`;
  const products = getProducts(product.location);
  const updatedProducts = products.map((p: Product) =>
    p.id === product.id ? product : p
  );
  localStorage.setItem(key, JSON.stringify(updatedProducts));
};
