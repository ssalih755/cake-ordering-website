import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

//cart provider, this creates the cart with an empty array
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  //add to cart
  function addToCart(cake) {
    setCartItems((currentItems) => [...currentItems, cake]);
  }

  //update cart
  function updateCart(cakeId, quantity, writing) {
    setCartItems((currentItems) =>
      currentItems.map((cake) => {
        if (cake.id === cakeId) {
          return { ...cake, quantity, writing };
        }
        return cake;
      })
    );
  }

  //remove from cart
  function removeFromCart(cakeId) {
    setCartItems((currentItems) =>
      currentItems.filter((cake) => cake.id !== cakeId)
    );
  }

  //clear cart
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
