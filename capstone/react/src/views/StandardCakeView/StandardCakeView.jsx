import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StandardCakeView.module.css";
import cake from "../HomeView/cake.png";
import cake1 from "../HomeView/cake1.png";
import cake2 from "../HomeView/cake2.png";
import cake3 from "../HomeView/cake3.png";
import CakeService from "../../services/CakeService";
import CakeCard from "../../components/CakeCard/CakeCard";

export default function StandardCakeView() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    CakeService.getStandardCakes()
      .then((response) => {
        setCakes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.cardContainer}>
      {cakes.map((cake) => {
        // this is how the compontent knows about the cake context
        return <CakeCard key={cake.id} cake={cake} />;
      })}
    </div>
  );
}
