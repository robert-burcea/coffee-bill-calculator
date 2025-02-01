import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuBarProps {
  location: "cantina" | "viva";
}

export const MenuBar = ({ location }: MenuBarProps) => {
  const navigate = useNavigate();
  const targetLocation = location === "cantina" ? "viva" : "cantina";

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-[#333333]">{location.toUpperCase()}</h1>
      <div className="hidden md:block">
        <Button
          variant="outline"
          onClick={() => navigate(`/${targetLocation}`)}
          className="gap-2 border-green-500 text-green-600 hover:bg-green-100 hover:text-[#333333]"
        >
          <Navigation className="h-4 w-4" />
          {targetLocation.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};