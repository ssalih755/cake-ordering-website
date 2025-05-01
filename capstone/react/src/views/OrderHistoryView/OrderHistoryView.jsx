import { useEffect, useState, useContext } from "react";
import OrderService from "../../services/OrderService";
import styles from "./OrderHistoryView.module.css";
import { UserContext } from "../../context/UserContext";
import { isAdmin } from "../../services/UserHelper";
import { useNavigate } from "react-router-dom";
import convertTo12Hour from "../../components/HelperFunctions/convertTo12Hour";

export default function OrderHistoryView() {
  const [orders, setOrders] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const reloadData = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.id) return;
        const response = isAdmin(user)
          ? await OrderService.getAllOrders()
          : await OrderService.getMyOrders(user.id);
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    if (user?.id) {
      fetchOrders();
    }
  }, [reloadTrigger, user]);

  const groupedOrders = Object.values(
    orders.reduce((acc, order) => {
      const id = order.id;
      if (!acc[id]) {
        acc[id] = {
          ...order,
          totalQuantity: order.cakeQuantity || 0,
        };
      } else {
        acc[id].totalQuantity += order.cakeQuantity || 0;
      }

      return acc;
    }, {})
  );

  const handleOrderClick = () => {
    navigate(`/inprocessOrders`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order History</h2>
      <button className={styles.toggleButton} onClick={handleOrderClick}>
        Orders
      </button>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Order Id</th>
            <th className={styles.tableHeader}>Customer Name</th>
            <th className={styles.tableHeader}>Order Status</th>
            <th className={styles.tableHeader}>Pickup Date</th>
            <th className={styles.tableHeader}>Pickup Time</th>
            <th className={styles.tableHeader}>Number of Cakes</th>
          </tr>
        </thead>
        <tbody>
          {groupedOrders.map((order) => (
            <tr key={order.id}>
              <td className={styles.tableCell}>{order.id}</td>
              <td className={styles.tableCell}>{order.customerName}</td>
              <td className={styles.tableCell}>{order.status}</td>
              <td className={styles.tableCell}>{order.pickupDate}</td>
              <td className={styles.tableCell}>
                {convertTo12Hour(order.pickupTime)}
              </td>
              <td className={styles.tableCell}>{order.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
