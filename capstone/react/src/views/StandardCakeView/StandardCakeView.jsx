import React, { useEffect, useState,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StandardCakeView.module.css";
import cake from "../HomeView/cake.png";
import cake1 from "../HomeView/cake1.png";
import cake2 from "../HomeView/cake2.png";
import cake3 from "../HomeView/cake3.png";
import CakeService from "../../services/CakeService";
import CakeCard from "../../components/CakeCard/CakeCard";
import { UserContext } from "../../context/UserContext";

// import { UserContext } from "../../path-to-your-UserContext"; // Update this path
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
    
    navigate("/admin/add-cake");      //this needs to have its path updated
  };
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <h1>Standard Cakes</h1>
        {isAdmin(user) && (
          <button 
            className={styles.adminButton}
            onClick={handleAddNewCake}
          >
            Add New Cake
          </button>
        )}
      </div>
      <div className={styles.cardContainer}>
        {cakes.map((cake) => {
          return <CakeCard key={cake.id} cake={cake} />;
        })}
      </div>
    </div>
  );
}