export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface BillItem {
  product: Product;
  quantity: number;
}

export interface Bill {
  id: string;
  items: BillItem[];
  total: number;
  timestamp: number;
}