import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import styles from "./CartView.module.css";
import OrderSummary from "../OrderSummary/OrderSummary";
import customCakePic from "./customCakePic.png";

export default function CartView() {
  const { cartItems, updateCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState("");

  const [pickupTime, setPickupTime] = useState(() => {
    return localStorage.getItem("pickupTime") || "9:00 AM";
  });

  //sync to local storage
  useEffect(() => {
    localStorage.setItem("pickupDate", pickupDate);
    localStorage.setItem("pickupTime", pickupTime);
  }, [pickupDate, pickupTime]);

  const getMinPickupDate = () => {
    const today = new Date();
    const hasCustomCake = cartItems.some((cake) => cake.type === "Custom");
    const leadTimeDays = hasCustomCake ? 3 : 2;
    today.setDate(today.getDate() + leadTimeDays);
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("pickupDate");
    if (storedDate) {
      setPickupDate(storedDate);
    } else {
      const minDate = getMinPickupDate();
      setPickupDate(minDate);
    }
  }, [cartItems]);

  const getAvailableHours = () => {
    if (!pickupDate) return [];
    const day = new Date(pickupDate).getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0) return []; // Sunday = closed
    if (day === 6)
      return ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"]; // Saturday
    return [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ];
  };

  const availableHours = getAvailableHours();

  const handleCheckout = () => {
    navigate("/ordersummary", {
      state: { pickupDate, pickupTime },
    });
  };

  return (
    <div>
      <h2 className={styles.cart}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Shopping cart is empty.</p>
      ) : (
        <div className={styles.cartContainer}>
          {cartItems.map((cake) => (
            <div key={cake.id} className={styles.cartItem}>
              <img
                className={styles.cakeImage}
                src={cake.imgURL || customCakePic}
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = customCakePic;
                }}
                alt="Bams Cakery"
                onChange={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = customCakePic;
                }}
              />

              <div className={styles.cartDetails}>
                <h5>Cake: {cake.name}</h5>
                <p>Description: {cake.description}</p>
                <p>Flavor: {cake.flavor}</p>
                <p>Filling: {cake.filling}</p>
                <p>Frosting: {cake.frosting}</p>
                <p>Style: {cake.style}</p>
                <p>Writing: {cake.writing}</p>
                <p>Price: ${cake.price}</p>
                <p>
                  Quantity:{" "}
                  <input
                    type="number"
                    value={cake.quantity ?? 1}
                    min="1"
                    onChange={(e) => {
                      const val = Math.max(1, parseInt(e.target.value) || 1);
                      updateCart(cake.id, val, cake.writing);
                    }}
                  />
                </p>
                <button onClick={() => removeFromCart(cake.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
            >
              <div className={styles.form} id="order-form">
                <p className={styles.formLabel}>Pickup Date</p>
                <input
                  type="date"
                  className={styles.formInput}
                  value={pickupDate}
                  onChange={(event) => {
                    setPickupDate(event.target.value);
                    setPickupTime(""); // reset time on date change
                  }}
                  min={getMinPickupDate()}
                />

                <p className={styles.formLabel}>Pickup Time</p>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  disabled={availableHours.length === 0}
                >
                  <option value="">Select Pickup Time</option>
                  {availableHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>

                {availableHours.length === 0 && pickupDate && (
                  <p className={styles.warning}>We are closed on Sundays.</p>
                )}

                <button
                  type="submit"
                  className={styles.formButton}
                  disabled={!pickupDate || !pickupTime}
                >
                  Proceed To Checkout
                </button>
              </div>
            </form>
            <div className={styles.clearCart}>
              <button onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
