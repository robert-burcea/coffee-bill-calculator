
import { Button } from "@/components/ui/button";
import { ShoppingCart, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  location: "cantina" | "viva";
}

export const CategoryBar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  location,
}: CategoryBarProps) => {
  return (
    <div className="md:float-left md:w-48 md:mr-6 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Categorii</h2>
        <div className="flex flex-wrap md:flex-col gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(null)}
            className="text-xs w-full justify-start"
          >
            Toate
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category)}
              className="text-xs w-full justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {selectedCategory && (
        <div className="flex flex-col gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-blue-100 hover:bg-blue-200 border-blue-300 w-full justify-start"
            asChild
          >
            <Link to={`/${location}-inventory/${selectedCategory.toLowerCase()}`}>
              <ClipboardCheck className="mr-1 h-3 w-3" />
              Inventar {selectedCategory}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-green-100 hover:bg-green-200 border-green-300 w-full justify-start"
            asChild
          >
            <Link to={`/${location}-orders/${selectedCategory.toLowerCase()}`}>
              <ShoppingCart className="mr-1 h-3 w-3" />
              Comenzi {selectedCategory}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
