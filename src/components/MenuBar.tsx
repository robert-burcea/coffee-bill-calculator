
import { Link } from "react-router-dom";
import { Package, ArrowRightLeft } from "lucide-react";

interface MenuBarProps {
  location: "cantina" | "viva";
}

export const MenuBar = ({ location }: MenuBarProps) => {
  const getLocationName = (loc: "cantina" | "viva") => {
    return loc === "cantina" ? "Cantina" : "Viva";
  };

  const otherLocation = location === "cantina" ? "viva" : "cantina";
  const otherLocationName = getLocationName(otherLocation);

  return (
    <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <Link to="/" className="text-blue-600 hover:text-blue-800">
        ← Home
      </Link>
      <h1 className="text-xl font-bold text-center flex-1">
        {getLocationName(location)}
      </h1>
      <div className="flex gap-4">
        <Link
          to={`/${otherLocation}`}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowRightLeft className="h-4 w-4 mr-1" />
          {otherLocationName}
        </Link>
        <Link
          to={`/${location}-inventory`}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <Package className="h-4 w-4 mr-1" />
          Inventar
        </Link>
      </div>
    </div>
  );
};
