import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./CartView.module.css"; // adjust if you have a different CSS file
// import cakePic from "../../assets/cakePic.jpg"; // adjust path as needed

export default function CartView() {
  const { addToCart, cartItems, updateCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <div>
      <h2 className={styles.cart}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cartContainer}>
          {cartItems.map((cake) => (
            <div key={cake.id} className={styles.cartItem}>
              {/* <img src={cake.imgURL || cakePic} alt="Bams Cakery" /> */}
              <img src={cake.imgURL} alt="Bams Cakery" />
              <div className={styles.cartDetails}>
                <h5>{cake.name}</h5>
                <p>{cake.description}</p>
                <p>{cake.flavor}</p>
                <p>{cake.filling}</p>
                <p>{cake.frosting}</p>
                <p>{cake.style}</p>
                <p>{cake.writing}</p>
                <h2>${cake.price}</h2>
                <input
                  type="number"
                  value={cake.quantity}
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
        </div>
      )}
    </div>
  );
}
