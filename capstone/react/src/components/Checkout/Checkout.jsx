import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

import styles from "./Checkout.module.css";
import OrderService from "../../services/OrderService.js";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const cakeId = state?.cakeId;
  const cakeQuantity = state?.cakeQuantity;

  const [notification, setNotification] = useState("");

  
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  

  function handleSubmit(event) {
    event.preventDefault();
    setNotification(true);

    // build the order object
    const order = {
      //userId: user?.user.id,
      userId: 1,
      orderStatusId: 1,
      pickupDate,
      pickupTime,
      orderDetails: [
        {
          cakeId,
          cakeQuantity,
        },
      ],
    };

    OrderService.createOrder(order)
      .then(() => {
        setNotification({
          type: "success",
          message: "Order Placed Successfully",
        });

        
       
      })
      .catch((error) => {
        // Check for a response message, but display a default if that doesn't exist
        const message = error.response?.data?.message || "Create order failed.";
        setNotification({ type: "error", message: message });
      });
     
  }



  return (
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
          />
          <p className={styles.formLabel}>Pickup Time</p>
          <input
            type="time"
            className={styles.formInput}
            value={pickupTime}
            placeholder="Pickup Time"
            onChange={(event) => setPickupTime(event.target.value)}
          />
         
        
          <button type="submit" className={styles.formButton}>
            Submit
          </button> 
        
          
        </div> 
     </form>     
     {notification.message ? (
          <div className={styles.notification}>
            {notification.message}
           </div>
          ): null}
    </div>
  );
}
 
