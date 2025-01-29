import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MenuBarProps {
  location: "cantina" | "viva";
}

export const MenuBar = ({ location }: MenuBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
        Spoonful - {location.toUpperCase()}
      </h1>
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="text-gray-600"
      >
        Schimbă locația
      </Button>
    </div>
  );
};