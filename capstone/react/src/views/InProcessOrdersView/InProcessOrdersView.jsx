// InProcessOrdersView.jsx - Updated import section
import { useEffect, useState, useContext } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

import OrderService from "../../services/OrderService";
import styles from "./InProcessOrdersView.module.css";
import { isAdmin } from "../../services/UserHelper";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import convertTo12Hour from "../../components/HelperFunctions/convertTo12Hour";

export default function InProcessOrdersView() {
  const [pendingOrProcessingOrders, setPendingOrProcessingOrders] = useState(
    []
  );
  const user = useContext(UserContext);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [activeView, setActiveView] = useState("table"); // Add state for toggling view
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

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
    const fetchOrders = async () => {
      try {
        const response = isAdmin(user)
          ? await OrderService.getInProcessOrders()
          : await OrderService.getMyPendingOrders(user.id);
        setPendingOrProcessingOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [reloadTrigger, user]);

  const groupedOrders = Object.values(
    pendingOrProcessingOrders.reduce((acc, order) => {
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

  const handleOrderHistoryClick = () => {
    navigate(`/getMyOrders/${user.id}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Orders</h2>

      {/* Add view toggle buttons */}
      {isAdmin(user) && (
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${
              activeView === "table" ? styles.activeButton : ""
            }`}
            onClick={() => setActiveView("table")}
          >
            Table View
          </button>
          <button
            className={`${styles.toggleButton} ${
              activeView === "calendar" ? styles.activeButton : ""
            }`}
            onClick={() => setActiveView("calendar")}
          >
            Calendar View
          </button>
        </div>
      )}

      <button className={styles.toggleButton} onClick={handleOrderHistoryClick}>
        Order History
      </button>

      <div className={styles.calendarAndTableWrapper}>
        {(activeView === "table" || !isAdmin(user)) && (
          <table className={styles.ordersTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeader}>Order Id</th>
                <th className={styles.tableHeader}>Customer Name</th>
                <th className={styles.tableHeader}>Order Status</th>
                <th className={styles.tableHeader}>Pickup Date</th>
                <th className={styles.tableHeader}>Pickup Time</th>
                <th className={styles.tableHeader}>Number of Cakes</th>
                {isAdmin(user) && (
                  <th className={styles.tableHeader}>Edit Status</th>
                )}
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
        )}

        {isAdmin(user) && activeView === "calendar" && (
          <Calendar
            className={styles.fullWidthCalendar}
            style={{ width: "100%" }}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const ordersOnThisDay = groupedOrders.filter((order) => {
                  const orderDate = new Date(order.pickupDate);
                  return (
                    orderDate.getFullYear() === date.getFullYear() &&
                    orderDate.getMonth() === date.getMonth() &&
                    orderDate.getDate() === date.getDate()
                  );
                });
                return (
                  <div className={styles.tileContent}>
                    {ordersOnThisDay.map((order) => (
                      <div key={order.id} className={styles.orderTileEntry}>
                         #{order.id} for "{order.customerName}"
                      </div>
                    ))}
                  </div>
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
