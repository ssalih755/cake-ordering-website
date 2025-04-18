import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../services/AuthService";
import Notification from "../../components/Notification/Notification";
import axios from "axios";
import styles from "./HomeView.module.css";

export default function HomeView() {
  return (
    <div className="homePage">
      <section className="ourStory">
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
          families celebrate life's milestones. Community engagement remains at
          our core, from hosting monthly baking workshops to supporting local
          charity events. At Bams Cakery, we're not just selling pastries we're
          creating experiences that bring joy to your everyday life and special
          occasions alike.
        </p>
      </section>

      <section className="standardCakes">
        <h1>Cakes</h1>
      </section>
      <section className="customCakes">
        <h1>Custom cakes</h1>
      </section>
      <section className="flavors">
        <h1>Flavors </h1>
      </section>
    </div>
  );
}
