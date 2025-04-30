import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import styles from "./CartView.module.css";

const getMinDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const hours = [
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

export default function CartView() {
  const { cartItems, updateCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

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
                src={cake.imgURL}
                alt="Bams Cakery"
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
                <input
                  type="number"
                  value={cake.quantity ?? 1}
                  min="1"
                  onChange={(e) =>
                    updateCart(cake.id, parseInt(e.target.value), cake.writing)
                  }
                />
                <button onClick={() => removeFromCart(cake.id)}>Remove</button>
              </div>
            </div>
          ))}

          <button onClick={clearCart}>Clear Cart</button>

          <div>
            <h2 className={styles.title}>Checkout</h2>
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
                  onChange={(event) => setPickupDate(event.target.value)}
                  min={getMinDate()}
                />

                <p className={styles.formLabel}>Pickup Time</p>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                >
                  <option value="">Select Pickup Time</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className={styles.formButton}
                  disabled={!pickupDate || !pickupTime}
                >
                  Proceed To Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
