import { useLocation } from "react-router-dom";
import styles from "./OrderConfirmation.module.css";
import convertTo12Hour from "../../components/HelperFunctions/convertTo12Hour";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className={styles.confirmationContainer}>
      <h2 className={styles.title}>Order Confirmation</h2>
      <p className={styles.message}>Thank you for your order!</p>
      <p className={styles.message}>
        Your order #({order.id}) has been placed successfully.
      </p>
      <p className={styles.pickupDetails}> Pickup Details:</p>
      <p className={styles.pickupDetails}>Date: {order.pickupDate}</p>
      <p className={styles.pickupDetails}>
        Time: {convertTo12Hour(order.pickupTime)}
      </p>
      <p>
        We’re getting started on your cake! You can login to your account to
        track your order.
      </p>
    </div>
  );
}
