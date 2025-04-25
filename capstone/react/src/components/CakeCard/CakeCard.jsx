import React, { useContext } from "react";
import cakePic from "../../Views/HomeView/cake.png";
import styles from "./CakeCard.module.css";
import { isAdmin } from "../../services/UserHelper";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom"; 

export default function CakeCard({ cake, onAvailabilityChanged }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleStandardCake = () => { 
    navigate(`/cakes/${cake.id}`); 
  };

  const handleToggleClick = (e) => {
    e.stopPropagation(); // prevent navigation when clicking the button
    onAvailabilityChanged(cake.id);
  };

  return (
    <div className={styles.card} onClick={handleStandardCake} style={{ cursor: "pointer" }}>
      <img src={cake.imgURL || cakePic} alt="Bams Cakery" />
      <div className="card-body">
        <h5 className="card-name">{cake.name}</h5>
        <p className="card-text">{cake.description}</p>
        <h2>${cake.price}</h2>
      </div>

      {isAdmin(user) && (
        <div className={styles.cardFooter}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.adminButton}
              onClick={handleToggleClick}
            >
              Toggle Availability
            </button>
            <div className={styles.availableText}>
              <p>{cake.available ? "AVAILABLE" : "UNAVAILABLE"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

