
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

  // Prevent form submission which causes page navigation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-2 sm:px-4 py-2 sm:py-4">
      <Input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Caută după nume, cod de bare..."
        className="w-full max-w-full"
        // Prevent Enter key from submitting the form
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      />
    </form>
  );
};
