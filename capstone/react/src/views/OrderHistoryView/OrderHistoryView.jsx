import { useEffect, useState, useContext } from "react";
import OrderService from "../../services/OrderService";
import styles from "./OrderHistoryView.module.css";
import { UserContext } from "../../context/UserContext";
import { use } from "react";

export default function OrderHistoryView() {
  const [getMyOrders, setMyOrders] = useState([]);
  const user = useContext(UserContext);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reloadData = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  

  useEffect(() => {
    if (user?.id) {
      OrderService.getMyOrders(user.id)
        .then((response) => setMyOrders(response.data))
        .catch((err) => console.error(err));
    }
  }, [user?.id, reloadTrigger]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Orders</h2>
      <table>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Order Id</th>
            <th className={styles.tableHeader}>Customer Name</th>
            <th className={styles.tableHeader}>Order Status</th>
            <th className={styles.tableHeader}>Pickup Date</th>
            <th className={styles.tableHeader}>Pickup Time</th>
            <th className={styles.tableHeader}>Cake Name</th>
            <th className={styles.tableHeader}>Cake Type</th>
            <th className={styles.tableHeader}>Writing</th>
            
          </tr>
        </thead>
        <tbody>
          {getMyOrders.map((order) => (
            <tr key={order.id}>
              <td className={styles.tableCell}>{order.id}</td>
              <td className={styles.tableCell}>{order.customerName}</td>
              <td className={styles.tableCell}>{order.status}</td>
              <td className={styles.tableCell}>{order.pickupDate}</td>
              <td className={styles.tableCell}>{order.pickupTime}</td>
              <td className={styles.tableCell}>{order.cakeName}</td>
              <td className={styles.tableCell}>{order.type}</td>
              <td className={styles.tableCell}>{order.writing}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

