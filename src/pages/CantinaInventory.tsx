
import { useParams } from "react-router-dom";
import InventoryPage from "./InventoryPage";

const CantinaInventory = () => {
  const { category } = useParams<{ category?: string }>();
  return <InventoryPage location="cantina" category={category} />;
};

export default CantinaInventory;
