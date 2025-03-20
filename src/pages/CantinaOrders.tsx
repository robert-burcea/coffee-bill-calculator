
import { useParams } from "react-router-dom";
import OrdersPage from "./OrdersPage";

const CantinaOrders = () => {
  const { category } = useParams<{ category?: string }>();
  return <OrdersPage location="cantina" category={category} />;
};

export default CantinaOrders;
