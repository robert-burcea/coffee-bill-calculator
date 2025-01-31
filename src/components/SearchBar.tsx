import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "@capacitor/camera";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleScan = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: "base64",
      });

      // In a real app, you would send this image to a barcode scanning API
      // For now, we'll just show a toast
      toast({
        title: "Barcode Scanning",
        description: "Barcode scanning functionality will be implemented here",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access camera",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 w-full mb-4 p-4">
      <Input
        type="text"
        placeholder="Search by name or barcode..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="flex-1 min-w-[200px]"
      />
      {isMobile && (
        <Button
          onClick={handleScan}
          variant="outline"
          className="whitespace-nowrap"
        >
          Scan Barcode
        </Button>
      )}
    </div>
  );
};