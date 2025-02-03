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
  if (bills.length > 0) {
    bills.pop(); // Remove the last bill
    localStorage.setItem("bills", JSON.stringify(bills));
  }
};

export const clearBills = () => {
  localStorage.setItem("bills", JSON.stringify([]));
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
      id: "1",
      name: "cola zero ciob 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492641",
    },
    {
      id: "2",
      name: "cola zero doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000091",
    },
    {
      id: "3",
      name: "cola doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000046",
    },
    {
      id: "4",
      name: "sprite doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000282",
    },
    {
      id: "5",
      name: "fanta doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000152",
    },
    {
      id: "6",
      name: "schweppes mojito doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321002798",
    },
    {
      id: "7",
      name: "schweppes bitter doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000367",
    },
    {
      id: "8",
      name: "schweppes tonic doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000381",
    },
    {
      id: "9",
      name: "schweppes mandarin doza 0.33",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000350",
    },
    {
      id: "10",
      name: "burn 0.25",
      price: 6.5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5940620000057",
    },
    {
      id: "11",
      name: "burn 0.5",
      price: 12,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5940620000040",
    },
    {
      id: "12",
      name: "jumex",
      price: 12,
      category: "BAUTURI",
      location: "cantina",
      barcode: "",
    },
    {
      id: "13",
      name: "cola pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492573",
    },
    {
      id: "14",
      name: "cola pet zero 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492702",
    },
    {
      id: "15",
      name: "sprite pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492610",
    },
    {
      id: "16",
      name: "fuzetea menta pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492757",
    },
    {
      id: "17",
      name: "fuzetea fructe padure pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492726",
    },
    {
      id: "18",
      name: "fuzetea citronela pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492733",
    },
    {
      id: "19",
      name: "fuzetea piersici pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492719",
    },
    {
      id: "20",
      name: "apa viva plata 0.5",
      price: 5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942324200603",
    },
    {
      id: "21",
      name: "apa viva minerala 0.5",
      price: 5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942324200597",
    },
    {
      id: "22",
      name: "apa evian 0.5",
      price: 10,
      category: "BAUTURI",
      location: "cantina",
      barcode: "3068320055008",
    },
    {
      id: "23",
      name: "schweppes mandarin pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492603",
    },
    {
      id: "24",
      name: "schweppes tonic pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492740",
    },
    {
      id: "25",
      name: "schweppes bitter pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492634",
    },
    {
      id: "26",
      name: "schweppes pink pet 0.5",
      price: 7.7,
      category: "BAUTURI",
      location: "cantina",
      barcode: "59492764",
    },
    {
      id: "27",
      name: "dorna minerala 2L",
      price: 7.1,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000657",
    },
    {
      id: "28",
      name: "dorna plata 2L",
      price: 7.1,
      category: "BAUTURI",
      location: "cantina",
      barcode: "5942321000572",
    },
    {
      id: "29",
      name: "bomboane raffaello",
      price: 22,
      category: "SNACKS",
      location: "cantina",
      barcode: "8000500023976",
    },
    {
      id: "30",
      name: "pergale milk",
      price: 20,
      category: "SNACKS",
      location: "cantina",
      barcode: "4770179998281",
    },
    {
      id: "31",
      name: "pergale champagne",
      price: 20,
      category: "SNACKS",
      location: "cantina",
      barcode: "4770179991459",
    },
    {
      id: "32",
      name: "praline cachet",
      price: 42,
      category: "SNACKS",
      location: "cantina",
      barcode: "5412956120377",
    },
    {
      id: "33",
      name: "mars cookies",
      price: 18,
      category: "SNACKS",
      location: "cantina",
      barcode: "5060402909566",
    },
    {
      id: "34",
      name: "bounty cookies",
      price: 18,
      category: "SNACKS",
      location: "cantina",
      barcode: "5060402907661",
    },
    {
      id: "35",
      name: "toblerone",
      price: 18,
      category: "SNACKS",
      location: "cantina",
      barcode: "7614500010013",
    },
    {
      id: "36",
      name: "twix secret centre",
      price: 20,
      category: "SNACKS",
      location: "cantina",
      barcode: "5056357911747",
    },
    {
      id: "37",
      name: "lion duo choco",
      price: 18,
      category: "SNACKS",
      location: "cantina",
      barcode: "7613287756565",
    },
    {
      id: "38",
      name: "lion 42g",
      price: 8,
      category: "SNACKS",
      location: "cantina",
      barcode: "7613287757067",
    },
    {
      id: "39",
      name: "lion white 42g",
      price: 8,
      category: "SNACKS",
      location: "cantina",
      barcode: "7613034120151",
    },
    {
      id: "40",
      name: "mars 51g",
      price: 10,
      category: "SNACKS",
      location: "cantina",
      barcode: "5900951313417",
    },
    {
      id: "41",
      name: "mars protein 50g",
      price: 18,
      category: "SNACKS",
      location: "cantina",
      barcode: "5000159516198",
    },
    {
      id: "42",
      name: "mars protein raspberry 55g",
      price: 20,
      category: "SNACKS",
      location: "cantina",
      barcode: "5056357912539",
    },
    {
      id: "43",
      name: "snickers protein white",
      price: 20,
      category: "SNACKS",
      location: "cantina",
      barcode: "5056357909546",
    },
    {
      id: "44",
      name: "snickers protein",
      price: 18,
      category: "SNACKS",
      location: "cantina",
      barcode: "5000159516211",
    },
    {
      id: "45",
      name: "kitkat chunky",
      price: 8,
      category: "SNACKS",
      location: "cantina",
      barcode: "3800020412169",
    },
    {
      id: "46",
      name: "nuori chocolate",
      price: 12,
      category: "SNACKS",
      location: "cantina",
      barcode: "3800229511670",
    },
    {
      id: "47",
      name: "nuori coconut",
      price: 12,
      category: "SNACKS",
      location: "cantina",
      barcode: "3800229511663",
    },
    {
      id: "48",
      name: "oreo cake",
      price: 6,
      category: "SNACKS",
      location: "cantina",
      barcode: "7622210785114",
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
