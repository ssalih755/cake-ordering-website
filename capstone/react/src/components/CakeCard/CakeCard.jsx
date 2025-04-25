import React, { useContext } from "react";
import cakePic from "../../Views/HomeView/cake.png";
import styles from "./CakeCard.module.css";
import { isAdmin } from "../../services/UserHelper";
import { UserContext } from "../../context/UserContext";

export default function CakeCard({ cake, onAvailabilityChanged }) {
  const user = useContext(UserContext);


  return (
    <div className={styles.card}>
      <img src={cake.imgURL || cakePic} alt="Bams Cakery" />
      <div className="card-body">
        <h5 className="card-name">{cake.name}</h5>
        <p className="card-text">{cake.description}</p>
        <h2>${cake.price}</h2>
      </div>

      <div  className={styles.cardFooter}>
      <section className={styles.buttonContainer}>
          {isAdmin(user) && (
            <button
              className={styles.adminButton}
              onClick={() => onAvailabilityChanged(cake.id)}
            >
              Toggle Availability
            </button>
          )}
           {isAdmin(user) && (
          <section className={styles.availableText}>
            {cake.available ? <h1>AVAILABLE</h1> : <h1>UNAVAILABLE</h1>}
          </section>
        )}
        </section>
        </div>
       
    </div>
  );
}
