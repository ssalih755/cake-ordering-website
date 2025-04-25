import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StandardCakeView.module.css";
import CakeService from "../../services/CakeService";
import CakeCard from "../../components/CakeCard/CakeCard";
import { UserContext } from "../../context/UserContext";
import { isAdmin } from "../../services/UserHelper";

export default function StandardCakeView() {
  const [cakes, setCakes] = useState([]);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadCakes();
  }, []);


  const loadCakes = () => {
    // Determine which endpoint to use based on admin status
    const cakeEndpoint = isAdmin(user) 
      ? CakeService.getStandardCakes() 
      : CakeService.getAllCakes();
      
    cakeEndpoint
      .then((response) => {
        setCakes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddNewCake = () => {
    navigate("/addcake");
  };

  const handleAddNewOptions = () => {
    navigate("/addoption");
  };

  const handleAvailabilityChanged = (cakeId) => {
    CakeService.toggleAvailability(cakeId)
      .then(() => {
        loadCakes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleAndButtonContainer}>
          <h1>Standard Cakes</h1>
          {isAdmin(user) && (
            <section className={styles.buttonContainer}>
              <button className={styles.adminButton} onClick={handleAddNewCake}>
                Add Cake
              </button>
              <button className={styles.adminButton} onClick={handleAddNewOptions}>
                Add Cake Options
              </button>
            </section>
          )}
        </div>
      </div>

      <div className={styles.cardContainer}>
        {cakes.map((cake) => (
          <CakeCard
            key={cake.id}
            cake={cake}
            onAvailabilityChanged={handleAvailabilityChanged}
          />
        ))}
      </div>
    </div>
  );
}