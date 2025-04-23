import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StandardCakeView.module.css";
import CakeService from "../../services/CakeService";
import CakeCard from "../../components/CakeCard/CakeCard";
import { UserContext } from "../../context/UserContext";
import { isAdmin } from "../../services/UserHelper"; // Update this path

export default function StandardCakeView() {
  const [cakes, setCakes] = useState([]);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    CakeService.getStandardCakes()
      .then((response) => {
        setCakes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddNewCake = () => {
    navigate("/addcake");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
       <div className={styles.titleAndButtonContainer}>
        <h1>Standard Cakes</h1>
        {isAdmin(user) && (
          <button className={styles.adminButton} onClick={handleAddNewCake}>
            Add Cake
          </button>
        )}
        </div>
      </div>
      <div className={styles.cardContainer}>
        {cakes.map((cake) => {
          return <CakeCard key={cake.id} cake={cake} />;
        })}
      </div>
    </div>
  );
}
