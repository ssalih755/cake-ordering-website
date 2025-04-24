import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import cakePic from "../../Views/HomeView/cake.png";
import styles from "./CakeCard.module.css";
import { isAdmin } from "../../services/UserHelper";
import { UserContext } from "../../context/UserContext"; // Add this import (adjust path as needed)

export default function CakeCard({ cake }) {
  const user = useContext(UserContext);
  const navigate = useNavigate(); // Initialize navigate
  
  const handleAddNewCake = () => {
    navigate("/addcake");
  };
  
  return (
    <div className={styles.card}>
      <img src={cake.imgURL} alt="Bams Cakery" />
      <div className="card-body">
        <h5 className="card-name">{cake.name}</h5>
        <p className="card-text">{cake.description}</p>
        <h2>${cake.price}</h2>
        <section className={styles.buttonContainer}>
          {isAdmin(user) && (
            <button className={styles.adminButton} onClick={handleAddNewCake}>
              Toggle Availability
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
