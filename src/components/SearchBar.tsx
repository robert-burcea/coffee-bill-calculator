
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length >= 2) {
      onSearch(searchTerm);
    } else if (searchTerm.length === 0) {
      onSearch("");
    }
  }, [searchTerm, onSearch]);

  return (
    <form className="flex flex-wrap gap-2 w-full mb-4 p-4">
      <Input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Caută după nume, cod de bare sau cod de identificare..."
        className="flex-1 min-w-[200px]"
      />
    </form>
  );
};
