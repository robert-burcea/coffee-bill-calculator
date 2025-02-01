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

export const initializeProducts = () => {
  const products = [
    {
      id: "1",
      name: "Espresso",
      price: 8,
      category: "CAFEA",
      location: "viva",
      barcode: "123456789"
    },
    {
      id: "2",
      name: "Cappuccino",
      price: 12,
      category: "CAFEA",
      location: "viva",
      barcode: "223456789"
    },
    {
      id: "3",
      name: "Coca Cola",
      price: 7,
      category: "BAUTURI",
      location: "viva",
      barcode: "323456789"
    },
    {
      id: "4",
      name: "Tiramisu",
      price: 15,
      category: "DESERT",
      location: "viva",
      barcode: "423456789"
    },
    {
      id: "5",
      name: "Meniu 1",
      price: 25,
      category: "MENIURI",
      location: "cantina",
      barcode: "523456789"
    },
    {
      id: "6",
      name: "Meniu 2",
      price: 28,
      category: "MENIURI",
      location: "cantina",
      barcode: "623456789"
    },
    {
      id: "7",
      name: "Apa plata",
      price: 5,
      category: "BAUTURI",
      location: "cantina",
      barcode: "723456789"
    },
    {
      id: "8",
      name: "Omleta",
      price: 12,
      category: "MIC DEJUN",
      location: "cantina",
      barcode: "823456789"
    }
  ];
  
  localStorage.setItem("products", JSON.stringify(products));
  return products;
};
