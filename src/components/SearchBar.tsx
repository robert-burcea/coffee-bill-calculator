import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    onSearch(input.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 w-full mb-4 p-4">
      <Input
        type="text"
        name="search"
        placeholder="Search by name or barcode..."
        className="flex-1 min-w-[200px]"
      />
      <Button type="submit" className="whitespace-nowrap">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
};