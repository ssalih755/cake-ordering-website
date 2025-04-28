import { useEffect, useState, useContext } from "react";
import OrderService from "../../services/OrderService";
import styles from "./InProcessOrdersView.module.css";
import { isAdmin } from "../../services/UserHelper";
import { UserContext } from "../../context/UserContext";

export default function InProcessOrdersView() {
  const [inProcessOrders, setInProcessOrders] = useState([]);
  const user = useContext(UserContext);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reloadData = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  const handleUpdateStatus = (orderId) => {
    OrderService.updateStatus(orderId)
      .then(() => {
        reloadData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    OrderService.getInProcessOrders()
      .then((response) => setInProcessOrders(response.data))
      .catch((err) => console.error(err));
  }, [reloadTrigger]);

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
            {isAdmin(user) && (
              <th className={styles.tableHeader}>Edit Status</th>
            )}
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
              {isAdmin(user) && (
                <td className={styles.tableCell}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleUpdateStatus(order.id)}
                  >
                    Progress Order
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

