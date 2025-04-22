import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

import styles from "./Checkout.module.css";
import OrderService from "../../services/OrderService.js";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  //********* FIX: Destructure 'writing' from state *********
  const { cakeId, cakeQuantity, writing } = state || {};
  //********* END FIX *********

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
          writing,
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
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split('T')[0]; // returns "YYYY-MM-DD"
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0') + ':00'
  );
 
    return (
    <div>
      <h2 className={styles.title}>Checkout </h2>
      <form onSubmit={handleSubmit}  >
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
          <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
          <option value="">Select Time</option>
            {hours.map((hour) => (
            <option key={hour} value={hour}>
            {hour}
          </option>
            ))}
            </select>
        
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

function ConfirmationPage(notification) {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate('/'); 
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div>
       <p className={styles.notification}>
           {notification}
          </p>
      
      <p>Redirecting to the home page in {countdown} seconds...</p>
    </div>
  );
} 
 
