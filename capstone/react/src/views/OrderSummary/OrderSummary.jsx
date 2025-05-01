import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";
import styles from "./OrderSummary.module.css";
import convertTo24Hour from "../../components/HelperFunctions/convertTo24Hour";
import customCakePic from "../CartView/customCakePic.png";

function OrderSummary({ showTotal = true }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const user = useContext(UserContext); // assumes user is logged in and context is set up
  const location = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  const { pickupDate, pickupTime } = location.state || {};

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const handleSubmitOrder = () => {
    const order = {
      userId: user.id,
      orderStatusId: 1,
      pickupDate: pickupDate,
      pickupTime: convertTo24Hour(pickupTime),
      orderDetails: cartItems.map((item) => ({
        cakeId: item.id,
        writing: item.writing,
        cakeQuantity: item.quantity,
        
      })),
    };

    OrderService.createOrder(order)
      .then((response) => {
        const createdOrder = response.data;
        setNotification({
          type: "success",
          message: "Order Placed Successfully",
        });
        clearCart();
        navigate("/confirmation", { state: { order: createdOrder } });
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Create order failed.";
        setNotification({ type: "error", message });
      });
  };

  return (
    <div className={styles.summaryContainer}>
      <h3>Order Summary</h3>

      <p>
        <strong>Pickup Date:</strong> {pickupDate}
      </p>
      <p>
        <strong>Pickup Time:</strong> {pickupTime}
      </p>

      {cartItems.map((item) => (
        <div key={item.id} className={styles.itemRow}>
          <div className={styles.itemInfo}>
            <p>
             <div className={styles.cakeName}> <strong>{item.name}</strong></div>
            </p>
            <img
              src={item.imgURL || customCakePic }  onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                e.target.src = customCakePic ;
                 }}
              alt={item.name}
              className={styles.cakeImage}
            />
            <p>Description: {item.description}</p>
            <p>Flavor: {item.flavor}</p>
            <p>Filling: {item.filling}</p>
            <p>Frosting: {item.frosting}</p>
            <p>Style: {item.style}</p>
            <p>Writing: {item.writing || "None"}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price per item: ${parseFloat(item.price).toFixed(2)}</p>
            <p>
              Subtotal: $
              {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      {showTotal && (
        <div className={styles.total}>
          <strong>Total: ${calculateTotal()}</strong>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button
          className={styles.submitButton}
          onClick={handleSubmitOrder}
          disabled={!pickupDate || !pickupTime}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
