import { useState, useContext } from "react";
import {  useNavigate } from "react-router-dom";

import styles from "./CustomProductPageView.module.css";
import cakePic from "../HomeView/cake.png";
import CakeService from "../../services/CakeService";


import { CartContext } from "../../context/CartContext";

import Dropdown from "../../components/Dropdown";
import useOptionData from "../../Components/useOptionData";

import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";

export default function ProductPageView() {
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedFilling, setSelectedFilling] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrosting, setSelectedFrosting] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [writing, setWriting] = useState("");
  
  const navigate = useNavigate();
 
  
   
  const sizes = useOptionData(SizeService.getAllSizes);
  const flavors = useOptionData(FlavorService.getAllFlavors);
  const fillings = useOptionData(FillingService.getAllFillings);
  const frostings = useOptionData(FrostingService.getAllFrostings);
  const stylesData = useOptionData(StyleService.getAllStyles);

  
  const { addToCart } = useContext(CartContext);

  function handleSubmit(event) {
    event.preventDefault();

    const cake = {
      name: "Custom Cake",
      imgURL: "./customCakePic",
      flavor: selectedFlavor,
      filling: selectedFilling,
      size: selectedSize,
      frosting: selectedFrosting,
      style: selectedStyle,
      description: "Custom Cake",
      type: "Custom",
      price: 75.0,
    };

    CakeService.createCake(cake)
      .then((response) => {
        const newCake = {
          id: response.data.id,
          name: "Custom Cake",
          imgURL: "./customCakePic",
          flavor: selectedFlavor,
          filling: selectedFilling,
          size: selectedSize,
          frosting: selectedFrosting,
          style: selectedStyle,
          description: "Custom Cake",
          type: "Custom",
          price: 75.0,
          quantity: cakeQuantity,
          writing,
        };

        addToCart(newCake); // ✅ this adds it to your shared cart
        navigate("/cart");
      
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Create cake failed.";
       console.error(message);
      });
  }

  const cakeQuantity = 1;



  function handleWritingChange(event) {
    setWriting(event.target.value);
  }

  return (
    <>
      <h1 className={styles.cakePage}>Custom Cake Page</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <img src={cakePic} alt="Bams Cakery" className={styles.cakePic} />
          <div className={styles.dropdown}>
            <div>
              <Dropdown
                label="Cake Style"
                options={stylesData}
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                placeholder="-- Choose a style --"
                optionKey="style"
                optionValue="style"
              />
            </div>
            <div>
              <Dropdown
                label="Cake Flavor"
                options={flavors}
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                placeholder="-- Choose a flavor --"
                optionKey="flavor"
                optionValue="flavor"
              />
            </div>

            <div>
              <Dropdown
                label="Cake Filling"
                options={fillings}
                value={selectedFilling}
                onChange={(e) => setSelectedFilling(e.target.value)}
                placeholder="-- Choose a filling --"
                optionKey="filling"
                optionValue="filling"
              />
            </div>
            <div>
              <Dropdown
                label=" Cake Frosting"
                options={frostings}
                value={selectedFrosting}
                onChange={(e) => setSelectedFrosting(e.target.value)}
                placeholder="-- Choose a frosting --"
                optionKey="frosting"
                optionValue="frosting"
              />
            </div>
            <div>
              <Dropdown
                label="Cake Size"
                options={sizes}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                placeholder="-- Choose a size --"
                optionKey="size"
                optionValue="size"
              />
            </div>
          </div>
        </div>
        <section className={styles.buyNowContainer}>
          <input
            type="text"
            placeholder="Write your message here"
            value={writing}
            onChange={handleWritingChange}
            className={styles.writingInput}
          />

          <button type="submit" className={styles.formButton}>
            Add To Cart
          </button>
        </section>
      </form>
    </>
  );
}
