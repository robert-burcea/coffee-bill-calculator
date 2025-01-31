import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "bg-white shadow-sm",
        isMobile
          ? "sticky top-0 z-10 py-2 mb-4 w-full"
          : "fixed left-0 top-0 h-full w-48 py-8"
      )}
    >
      <ScrollArea
        className={cn(
          isMobile ? "w-full px-4" : "h-full"
        )}
      >
        <div
          className={cn(
            "space-y-2",
            isMobile && "flex flex-wrap gap-2 space-y-0"
          )}
        >
          <button
            onClick={() => onSelectCategory(null)}
            className={cn(
              "px-4 py-2 text-left rounded-lg transition-colors whitespace-nowrap",
              selectedCategory === null
                ? "bg-green-500 text-white"
                : "hover:bg-gray-100",
              !isMobile && "w-full"
            )}
          >
            Toate
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "px-4 py-2 text-left rounded-lg transition-colors whitespace-nowrap",
                selectedCategory === category
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100",
                !isMobile && "w-full"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};