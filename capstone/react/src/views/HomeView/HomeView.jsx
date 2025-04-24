import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Notification from "../../components/Notification/Notification";
import axios from "axios";
import styles from "./HomeView.module.css";
import cake from "./cake.png";
import cake1 from "./cake1.png";
import cake2 from "./cake2.png";
import cake3 from "./cake3.png";
import custom1 from "./custom1.png";
import custom2 from "./custom2.png";
import custom3 from "./custom3.png";
import flavor1 from "./images/flavor1.png";
import flavor2 from "./images/flavor2.png";
import flavor3 from "./images/flavor3.png";
import flavor4 from "./images/flavor4.png";
import flavor5 from "./images/flavor5.png";
import flavor6 from "./images/flavor6.png";

export default function HomeView() {
  const navigate = useNavigate();
  const handleCustomCake = () => {
    navigate("/cakes/2");
  };
  const handleStandardCake = () => {
    navigate("/cakes");
  };
  return (
    <div className="homePage">
      <div className={styles.about}>
        <section className={styles.ourStory}>
          <h2>Our Story</h2>
          <p>
            At Bams Cakery, we blend time-honored baking traditions with
            innovative flavors to create memorable treats for every occasion.
            Founded in 2018 by pastry chef Angel, our bakery has grown from a
            small neighborhood shop to a beloved community destination. We pride
            ourselves on using only the finest ingredients - locally sourced
            whenever possible - and creating everything from scratch daily. Our
            team of passionate bakers rises before dawn to ensure that every
            pastry, loaf, and confection meets our exacting standards. Beyond
            creating delicious baked goods, we believe in fostering connections
            through food. Our warm, inviting space welcomes customers to linger
            over coffee and conversation, while our custom cake service helps
            families celebrate life's milestones. Community engagement remains
            at our core, from hosting monthly baking workshops to supporting
            local charity events. At Bams Cakery, we're not just selling
            pastries we're creating experiences that bring joy to your everyday
            life and special occasions alike.
          </p>
        </section>

        <img src={cake} alt="Bams Cakery" className={styles.cake} />
      </div>

      <section className={styles.sectionContainer}>
        <h1 className={styles.types}>Cakes</h1>

        <div className={styles.cakeContainer}>
          <img src={cake1} alt="Bams Cakery" className={styles.standardCakes} onClick={handleStandardCake} />
          
          <img src={cake2} alt="Bams Cakery" className={styles.standardCakes} onClick={handleStandardCake} />
          <img src={cake3} alt="Bams Cakery" className={styles.standardCakes} onClick={handleStandardCake} />
        </div>
      </section>

      <section className={styles.sectionContainer}>
        <h1 className={styles.types}>Custom Cakes</h1>

        <div className={styles.cakeContainer}>
          <img
            src={custom1}
            alt="Bams Cakery"
            className={styles.standardCakes}
            onClick={handleCustomCake}
          />

          <img
            src={custom2}
            alt="Bams Cakery"
            className={styles.standardCakes}
            onClick={handleCustomCake}
          />

          <img
            src={custom3}
            alt="Bams Cakery"
            className={styles.standardCakes}
            onClick={handleCustomCake}
          />
        </div>
      </section>
      <section className={styles.sectionContainer} >
        <h1 className={styles.types}>Flavors</h1>

        <div className={styles.flavorContainer}>
          <div className={styles.flavorBox}>
            <img src={flavor1} alt="Bams Cakery" className={styles.flavor} />
            <h2>Red Velvet</h2>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor2} alt="Bams Cakery" className={styles.flavor} />
            <h2>Carrot Cake</h2>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor3} alt="Bams Cakery" className={styles.flavor} />
            <h2>Butter Cream</h2>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor4} alt="Bams Cakery" className={styles.flavor} />
            <h2>Chocolate</h2>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor5} alt="Bams Cakery" className={styles.flavor} />
            <h2>Lemon</h2>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor6} alt="Bams Cakery" className={styles.flavor} />
            <h2>Vanilla</h2>
          </div>
        </div>
      </section>
       
    </div>
  );
}
