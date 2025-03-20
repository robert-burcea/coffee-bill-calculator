
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, ClipboardCheck, ShoppingCart } from "lucide-react";

interface MenuBarProps {
  location: "cantina" | "viva";
}

export const MenuBar = ({ location }: MenuBarProps) => {
  const otherLocation = location === "cantina" ? "viva" : "cantina";
  const locationName = location === "cantina" ? "Cantina" : "Viva";
  const otherLocationName = location === "cantina" ? "Viva" : "Cantina";

  return (
    <div className="flex flex-wrap gap-2 mb-6 px-4 py-3 items-center justify-between bg-gray-50">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">{locationName}</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/${location}`}>
            <Package className="mr-2 h-4 w-4" />
            Produse
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/${location}-inventory`}>
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Inventar
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/${location}-orders`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Comenzi
          </Link>
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <Link to={`/${otherLocation}`}>
            Mergi la {otherLocationName}
          </Link>
        </Button>
      </div>
    </div>
  );
};
