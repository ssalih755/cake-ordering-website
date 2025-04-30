import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cake) => {
    setCartItems((prev) => [...prev, cake]);
  };

  const updateCart = (cakeId, quantity, writing) => {
    setCartItems((prev) =>
      prev.map((cake) =>
        cake.id === cakeId ? { ...cake, quantity, writing } : cake
      )
    );
  };

  const removeFromCart = (cakeId) => {
    setCartItems((prev) => prev.filter((cake) => cake.id !== cakeId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
