
import { useParams } from "react-router-dom";
import OrdersPage from "./OrdersPage";

const VivaOrders = () => {
  const { category } = useParams<{ category?: string }>();
  return <OrdersPage location="viva" category={category} />;
};

export default VivaOrders;
