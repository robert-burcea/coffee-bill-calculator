import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onAddCategory: (category: string) => void;
  onRemoveCategory: (category: string) => void;
}

export const CategoryBar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onRemoveCategory,
}: CategoryBarProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Eroare",
        description: "Numele categoriei nu poate fi gol",
        variant: "destructive",
      });
      return;
    }

    if (categories.includes(newCategory.toUpperCase())) {
      toast({
        title: "Eroare",
        description: "Această categorie există deja",
        variant: "destructive",
      });
      return;
    }

    onAddCategory(newCategory.toUpperCase());
    setNewCategory("");
    setIsDialogOpen(false);
    toast({
      title: "Succes",
      description: "Categoria a fost adăugată",
    });
  };

  return (
    <div className="overflow-x-auto sticky top-0 bg-white z-10 p-4 border-b">
      <div className="flex gap-2 min-w-max">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
        >
          Toate
        </Button>
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-1">
            <Button
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => onRemoveCategory(category)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adaugă categorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adaugă categorie nouă</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nume categorie"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory();
                  }
                }}
              />
              <Button onClick={handleAddCategory}>Adaugă</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};