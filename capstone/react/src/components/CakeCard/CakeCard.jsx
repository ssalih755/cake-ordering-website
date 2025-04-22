import React from "react";
import { useContext } from "react";
import cakePic from "../../Views/HomeView/cake.png";
import styles from "./CakeCard.module.css";

export default function CakeCard({ cake }) {
  return (
   
      <div className={styles.card}>
        <img src={cakePic} alt="Bams Cakery" />
        <div className="card-body">
          <h5 className="card-title">{cake.id}</h5>
          <p className="card-text">{cake.description}</p>
        </div>
      </div>
  
  );
}
