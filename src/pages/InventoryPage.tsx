
import { useState, useEffect } from "react";
import { InventoryData, InventoryItem, Product } from "@/types";
import { MenuBar } from "@/components/MenuBar";
import { getProducts } from "@/utils/storage";
import { SearchBar } from "@/components/SearchBar";
import { 
  getInventory, 
  updateProductInventory, 
  addToProductInventory,
  getInventoryStatus, 
  wasInventoriedToday,
  exportInventoryAsCSV,
  checkAndResetInventory,
  resetInventory
} from "@/utils/inventory";
import { InventoryProductCard } from "@/components/inventory/InventoryProductCard";
import { InventoryProgress } from "@/components/inventory/InventoryProgress";
import { InventoryExport } from "@/components/inventory/InventoryExport";
import { ClipboardList } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface InventoryPageProps {
  location: "cantina" | "viva";
  category?: string;
}

const InventoryPage = ({ location, category }: InventoryPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryData>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventoryStatus, setInventoryStatus] = useState({ total: 0, completed: 0 });
  
  useEffect(() => {
    // Check for daily reset of inventory
    checkAndResetInventory(location);
    
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
    
    // Load inventory
    const storedInventory = getInventory(location);
    setInventory(storedInventory);
    
    // Get inventory status - only count products in the current category if specified
    const status = category 
      ? getInventoryStatus(location, category.toUpperCase())
      : getInventoryStatus(location);
    setInventoryStatus(status);
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
    
    // Update inventory status - consider the category if specified
    const status = category 
      ? getInventoryStatus(location, category.toUpperCase())
      : getInventoryStatus(location);
    setInventoryStatus(status);
  };
  
  const handleAddToInventory = (productId: string, additionalCount: number) => {
    addToProductInventory(location, productId, additionalCount);
    
    // Update local state
    const currentCount = inventory[productId]?.count || 0;
    const updatedInventory = { 
      ...inventory,
      [productId]: {
        productId,
        count: currentCount + additionalCount,
        lastUpdated: Date.now()
      }
    };
    setInventory(updatedInventory);
    
    toast({
      title: "Cantitate adăugată",
      description: `${additionalCount} buc au fost adăugate la inventar.`
    });
    
    // Update inventory status
    const status = category 
      ? getInventoryStatus(location, category.toUpperCase())
      : getInventoryStatus(location);
    setInventoryStatus(status);
  };

  const handleExportInventory = () => {
    if (category) {
      exportInventoryAsCSV(location, category.toUpperCase());
    } else {
      exportInventoryAsCSV(location);
    }
    
    toast({
      title: "Export completat",
      description: "Fișierul XLSX cu inventarul a fost generat."
    });
  };
  
  const handleResetInventory = () => {
    resetInventory(location);
    setInventory({});
    setInventoryStatus({ total: products.length, completed: 0 });
    toast({
      title: "Inventar resetat",
      description: "Toate datele de inventar au fost resetate."
    });
  };

  const categoryTitle = category ? ` - ${category.toUpperCase()}` : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MenuBar location={location} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <ClipboardList className="h-8 w-8 mr-3 text-blue-600" />
          <h1 className="text-2xl font-bold">Inventar {location === "cantina" ? "Cantina" : "Viva"}{categoryTitle}</h1>
        </div>
        
        <InventoryProgress
          total={inventoryStatus.total}
          completed={inventoryStatus.completed}
        />
        
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <InventoryExport onExport={handleExportInventory} onReset={handleResetInventory} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredProducts.map(product => (
            <InventoryProductCard
              key={product.id}
              product={product}
              inventoryItem={inventory[product.id]}
              onUpdate={handleUpdateInventory}
              onAdd={handleAddToInventory}
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

export default InventoryPage;
