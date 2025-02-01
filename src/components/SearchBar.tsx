import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
    } else if (searchTerm.length === 0) {
      onSearch("");
    }
  }, [searchTerm, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 w-full mb-4 p-4">
      <Input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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