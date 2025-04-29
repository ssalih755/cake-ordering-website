import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import styles from "./CartView.module.css"; // adjust if you have a different CSS file
// import cakePic from "../../assets/cakePic.jpg"; // adjust path as needed

export default function CartView() {
  const { cartItems, updateCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const handleCheckout = () => {
    navigate("/checkout");
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
              {/* <img src={cake.imgURL || cakePic} alt="Bams Cakery" /> */}
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
            <h2 className={styles.title}>Checkout </h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.form} id="checkout-form">
                <p className={styles.formLabel}>Pickup Date</p>
                <input
                  type="date"
                  className={styles.formInput}
                  value={pickupDate}
                  placeholder="Pickup Date"
                  onChange={(event) => setPickupDate(event.target.value)}
                  min={getMinDate()}
                />
                <p className={styles.formLabel}>Pickup Time</p>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                >
                  <option value="">Select Time</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className={styles.formButton}
                  onClick={() => setShowPopup(true)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}
