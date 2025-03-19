
import { useState, useEffect } from "react";
import { InventoryData, InventoryItem, Product } from "@/types";
import { MenuBar } from "@/components/MenuBar";
import { getProducts } from "@/utils/storage";
import { SearchBar } from "@/components/SearchBar";
import { 
  getInventory, 
  updateProductInventory, 
  getInventoryStatus, 
  wasInventoriedToday,
  downloadFile,
  exportInventoryAsCSV
} from "@/utils/inventory";
import { InventoryProductCard } from "@/components/inventory/InventoryProductCard";
import { InventoryProgress } from "@/components/inventory/InventoryProgress";
import { InventoryExport } from "@/components/inventory/InventoryExport";

interface InventoryPageProps {
  location: "cantina" | "viva";
}

const InventoryPage = ({ location }: InventoryPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryData>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventoryStatus, setInventoryStatus] = useState({ total: 0, completed: 0 });

  useEffect(() => {
    // Load only products for this location
    const storedProducts = getProducts(location);
    setProducts(storedProducts.filter((p: Product) => !p.hidden && p.location === location));
    
    // Load inventory
    const storedInventory = getInventory(location);
    setInventory(storedInventory);
    
    // Get inventory status
    const status = getInventoryStatus(location);
    setInventoryStatus(status);
  }, [location]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      // Filter by name or barcode
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.barcode && p.barcode.includes(searchQuery))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleUpdateInventory = (productId: string, count: number) => {
    updateProductInventory(location, productId, count);
    
    // Update local state
    const updatedInventory = { 
      ...inventory,
      [productId]: {
        productId,
        count,
        lastUpdated: Date.now()
      }
    };
    setInventory(updatedInventory);
    
    // Update inventory status
    const status = getInventoryStatus(location);
    setInventoryStatus(status);
  };

  const handleExportInventory = () => {
    const csvContent = exportInventoryAsCSV(location);
    const today = new Date().toISOString().split('T')[0];
    downloadFile(csvContent, `inventar_${location}_${today}.csv`, 'text/csv;charset=utf-8;');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MenuBar location={location} />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Inventar {location === "cantina" ? "Cantina" : "Viva"}</h1>
        
        <InventoryProgress
          total={inventoryStatus.total}
          completed={inventoryStatus.completed}
        />
        
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <InventoryExport onExport={handleExportInventory} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredProducts.map(product => (
            <InventoryProductCard
              key={product.id}
              product={product}
              inventoryItem={inventory[product.id]}
              onUpdate={handleUpdateInventory}
            />
          ))}
          
          {filteredProducts.length === 0 && searchQuery.length > 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              Nu a fost găsit niciun produs
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
