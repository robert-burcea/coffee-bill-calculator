
import { useState, useEffect } from "react";
import { Product, OrderData, OrderItem } from "@/types";
import { MenuBar } from "@/components/MenuBar";
import { getProducts } from "@/utils/storage";
import { SearchBar } from "@/components/SearchBar";
import { 
  getOrders, 
  updateProductOrder, 
  getOrdersStatus, 
  exportOrdersAsCSV,
  downloadFile,
  checkAndResetOrders,
  resetOrders
} from "@/utils/orders";
import { OrderProductCard } from "@/components/orders/OrderProductCard";
import { OrderProgress } from "@/components/orders/OrderProgress";
import { OrdersExport } from "@/components/orders/OrdersExport";
import { ShoppingBasket } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OrdersPageProps {
  location: "cantina" | "viva";
  category?: string;
}

const OrdersPage = ({ location, category }: OrdersPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderData>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState({ total: 0, completed: 0 });
  
  useEffect(() => {
    // Check for daily reset of orders
    checkAndResetOrders(location);
    
    // Load only products for this location
    const storedProducts = getProducts(location);
    
    // Filter products by category if category is specified
    const productsForLocation = storedProducts.filter((p: Product) => {
      if (category) {
        return !p.hidden && p.location === location && p.category === category.toUpperCase();
      }
      return !p.hidden && p.location === location;
    });
    
    setProducts(productsForLocation);
    
    // Load orders
    const storedOrders = getOrders(location);
    setOrders(storedOrders);
    
    // Get order status - only count products in the current category if specified
    const status = category 
      ? getOrdersStatus(location, category.toUpperCase())
      : getOrdersStatus(location);
    setOrderStatus(status);
  }, [location, category]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      // Filter by name, barcode or identification code
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.barcode && p.barcode.includes(searchQuery)) ||
        (p.identificationCode && p.identificationCode.includes(searchQuery))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleUpdateOrder = (productId: string, count: number) => {
    updateProductOrder(location, productId, count);
    
    // Update local state
    const updatedOrders = { 
      ...orders,
      [productId]: {
        productId,
        count,
        lastUpdated: Date.now()
      }
    };
    setOrders(updatedOrders);
    
    // Update order status - consider the category if specified
    const status = category 
      ? getOrdersStatus(location, category.toUpperCase())
      : getOrdersStatus(location);
    setOrderStatus(status);
  };

  const handleExportOrder = () => {
    const csvContent = category 
      ? exportOrdersAsCSV(location, category.toUpperCase())
      : exportOrdersAsCSV(location);
    
    const today = new Date().toISOString().split('T')[0];
    const filename = category 
      ? `comanda_${location}_${category}_${today}.csv`
      : `comanda_${location}_${today}.csv`;
      
    downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
  };
  
  const handleFinalizeOrder = () => {
    // We're just showing a toast notification since the order is already saved in real-time
    toast({
      title: "Comandă finalizată",
      description: `Comanda pentru ${location === "cantina" ? "Cantina" : "Viva"} a fost finalizată cu succes.`,
    });
  };

  const handleResetOrders = () => {
    resetOrders(location);
    setOrders({});
    setOrderStatus({ total: products.length, completed: 0 });
    toast({
      title: "Comenzi resetate",
      description: "Toate comenzile au fost resetate."
    });
  };

  const categoryTitle = category ? ` - ${category.toUpperCase()}` : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MenuBar location={location} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <ShoppingBasket className="h-8 w-8 mr-3 text-green-600" />
          <h1 className="text-2xl font-bold">Comenzi {location === "cantina" ? "Cantina" : "Viva"}{categoryTitle}</h1>
        </div>
        
        <OrderProgress
          total={orderStatus.total}
          completed={orderStatus.completed}
        />
        
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <OrdersExport onExport={handleExportOrder} onFinalize={handleFinalizeOrder} onReset={handleResetOrders} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredProducts.map(product => (
            <OrderProductCard
              key={product.id}
              product={product}
              orderItem={orders[product.id]}
              onUpdate={handleUpdateOrder}
            />
          ))}
          
          {filteredProducts.length === 0 && searchQuery.length > 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              Nu a fost găsit niciun produs
            </div>
          )}
          
          {filteredProducts.length === 0 && searchQuery.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              Nu există produse în această categorie
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
