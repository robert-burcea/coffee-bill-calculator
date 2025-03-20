
import { Button } from "@/components/ui/button";
import { ShoppingCart, ClipboardCheck, Package } from "lucide-react";
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
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xl font-semibold">Categorii</h2>
        <div className="ml-auto flex gap-2">
          {selectedCategory && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                asChild
              >
                <Link to={`/${location}-inventory/${selectedCategory.toLowerCase()}`}>
                  <ClipboardCheck className="mr-1 h-3 w-3" />
                  Inventar
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                asChild
              >
                <Link to={`/${location}-orders/${selectedCategory.toLowerCase()}`}>
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  Comenzi
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(null)}
          className="text-xs"
        >
          Toate
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
