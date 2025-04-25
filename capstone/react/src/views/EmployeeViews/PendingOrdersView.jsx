import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import styles from "./PendingOrdersView.module.css";

const PendingOrdersView = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    OrderService.getAllPendingOrders()
      .then((response) => setPendingOrders(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Pending Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Id</th>
            <th>Order Status Id</th>
            <th>Pickup Date</th>
            <th>Pickup Time</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.orderStatusId}</td>
              <td>{order.pickupDate}</td>
              <td>{order.pickupTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrdersView;
