import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import styles from "./InProcessOrdersView.module.css";

export default function InProcessOrdersView() {
  const [inProcessOrders, setInProcessOrders] = useState([]);

  useEffect(() => {
    OrderService.getInProcessOrders()
      .then((response) => setInProcessOrders(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pending Orders</h2>
      <table>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableHeader}>Order Id</th>
            <th className={styles.tableHeader}>Customer Name</th>
            <th className={styles.tableHeader}>Order Status </th>
            <th className={styles.tableHeader}>Pickup Date</th>
            <th className={styles.tableHeader}>Pickup Time</th>
            <th className={styles.tableHeader}>Cake Name</th>
            <th className={styles.tableHeader}>Cake Type</th>
            <th className={styles.tableHeader}>Writing</th>
          </tr>
        </thead>
        <tbody>
          {inProcessOrders.map((order) => (
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
