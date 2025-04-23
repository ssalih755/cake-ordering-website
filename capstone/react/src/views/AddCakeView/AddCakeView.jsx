import React from "react";
import styles from "./AddCakeView.module.css";
import { useState, useEffect } from "react";
import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";

export default function AddCakeView() {
  const [flavors, setFlavors] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [frostings, setFrostings] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [styles, setStyles] = useState([]);

  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedFilling, setSelectedFilling] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrosting, setSelectedFrosting] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  //handles submission to Database
  function handleSubmit(event) {}

  useEffect(() => {
    SizeService.getAllSizes()
      .then((response) => {
        setSizes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    FlavorService.getAllFlavors()
      .then((response) => {
        setFlavors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    FillingService.getAllFillings()
      .then((response) => {
        setFillings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    FrostingService.getAllFrostings()
      .then((response) => {
        setFrostings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    StyleService.getAllStyles()
      .then((response) => {
        setStyles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* //5 dropdowns forms that connect with each option
          // 1 textbox for the cakename
          //1 tetxbox that accepts image URL */}

      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <input className="cakeName" type="text" />
          <select
            className="sizes"
            value={selectedSize}
            onChange={(event) => setSelectedSize(event.target.value)}
          >
            <option value="">-- Choose a size --</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.size}
              </option>
            ))}
          </select>
          <select
            className="flavors"
            value={selectedFlavor}
            onChange={(event) => setSelectedFlavor(event.target.value)}
          >
            <option value="">-- Choose a flavor --</option>
            {flavors.map((flavor) => (
              <option key={flavor.id} value={flavor.id}>
                {flavor.flavor}
              </option>
            ))}
          </select>
          <select
            className="fillings"
            value={selectedFilling}
            onChange={(event) => setSelectedFilling(event.target.value)}
          >
            <option value="">-- Choose a filling --</option>
            {fillings.map((filling) => (
              <option key={filling.id} value={filling.id}>
                {filling.filling}
              </option>
            ))}
          </select>
          <select
            className="frostings"
            value={selectedFrosting}
            onChange={(event) => setSelectedFrosting(event.target.value)}
          >
            <option value="">-- Choose a frosting --</option>
            {frostings.map((frosting) => (
              <option key={frosting.id} value={frosting.id}>
                {frosting.frosting}
              </option>
            ))}
          </select>
          <select
            className="styles"
            value={selectedStyle}
            onChange={(event) => setSelectedStyle(event.target.value)}
          >
            <option value="">-- Choose a style --</option>
            {styles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.style}
              </option>
            ))}
          </select>
          <input className="imgURL" type="text" />
        </div>
      </form>
    </div>
  );
}
