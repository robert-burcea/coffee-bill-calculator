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
  const visibleCategories = categories.filter(category => category !== "ASCUNSE");

  return (
    <div
      className={cn(
        "bg-[#f3f3f3] shadow-sm border-r border-[#e0e0e0]",
        isMobile
          ? "sticky top-0 z-10 py-2 mb-4 w-full"
          : "fixed left-0 top-0 h-full w-52 py-8"
      )}
    >
      <ScrollArea
        className={cn(
          isMobile ? "w-full px-4" : "h-full px-4"
        )}
      >
        <div
          className={cn(
            "space-y-3",
            isMobile && "flex flex-wrap gap-3 space-y-0 justify-center"
          )}
        >
          <button
            onClick={() => onSelectCategory(null)}
            className={cn(
              "px-4 py-2 text-left rounded-lg transition-colors whitespace-nowrap border shadow-sm hover:shadow-md",
              selectedCategory === null
                ? "bg-green-500 text-white border-green-600"
                : "bg-white text-gray-700 hover:bg-green-100 hover:text-gray-900 border-[#e0e0e0]",
              !isMobile && "w-full"
            )}
          >
            Toate
          </button>
          {visibleCategories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "px-4 py-2 text-left rounded-lg transition-colors whitespace-nowrap border shadow-sm hover:shadow-md",
                selectedCategory === category
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-white text-gray-700 hover:bg-green-100 hover:text-gray-900 border-[#e0e0e0]",
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