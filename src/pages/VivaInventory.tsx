
import { useParams } from "react-router-dom";
import InventoryPage from "./InventoryPage";

const VivaInventory = () => {
  const { category } = useParams<{ category?: string }>();
  return <InventoryPage location="viva" category={category} />;
};

export default VivaInventory;
