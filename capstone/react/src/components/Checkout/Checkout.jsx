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

  const [notification, setNotification] = useState(null);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

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
          message: "Order placed successful",
        });

        navigate("/");
      })
      .catch((error) => {
        // Check for a response message, but display a default if that doesn't exist
        const message = error.response?.data?.message || "Create order failed.";
        setNotification({ type: "error", message: message });
      });
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  return (
    <div>
      CheckoutView
      <form onSubmit={handleSubmit}>
        <div className={styles.form} id="checkout-form">
          <input
            type="text"
            value={firstname}
            className={styles.formInput}
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            value={lastname}
            className={styles.formInput}
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="email"
            value={email}
            className={styles.formInput}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            value={phone}
            className={styles.formInput}
            placeholder="Phone"
            onChange={(event) => setPhone(event.target.value)}
          />
          <input
            type="date"
            className={styles.formInput}
            value={pickupDate}
            placeholder="Pickup Date"
            onChange={(event) => setPickupDate(event.target.value)}
          />
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
    </div>
  );
}
