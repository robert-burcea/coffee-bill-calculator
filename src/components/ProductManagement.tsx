import { useState } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/utils/storage";

interface ProductManagementProps {
  location: "cantina" | "viva";
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export const ProductManagement = ({
  location,
  products,
  onProductsChange,
}: ProductManagementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();
  const categories = getCategories(location);

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category) {
      toast({
        title: "Eroare",
        description: "Toate câmpurile sunt obligatorii",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name,
      price: parseFloat(price),
      location,
      category,
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? newProduct : p
      );
      toast({
        title: "Succes",
        description: "Produsul a fost actualizat",
      });
    } else {
      updatedProducts = [...products, newProduct];
      toast({
        title: "Succes",
        description: "Produsul a fost adăugat",
      });
    }

    onProductsChange(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category);
    setIsOpen(true);
  };

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    onProductsChange(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast({
      title: "Succes",
      description: "Produsul a fost șters",
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            {editingProduct ? "Editează Produs" : "Adaugă Produs"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editează Produs" : "Adaugă Produs"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nume</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Preț</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Categorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectează o categorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              {editingProduct ? "Actualizează" : "Adaugă"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-4 space-y-2">
        {products
          .filter((p) => p.location === location)
          .map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-2 bg-white rounded-lg shadow"
            >
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">
                  {product.price} RON - {product.category}
                </div>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  Editează
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Șterge
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};