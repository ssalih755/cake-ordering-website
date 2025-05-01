import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import useOptionData from "../../Components/useOptionData";

import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";
import CakeService from "../../services/CakeService";

import styles from "./AddCakeView.module.css";

export default function AddCakeView() {
  const sizes = useOptionData(SizeService.getAllSizes);
  const flavors = useOptionData(FlavorService.getAllFlavors);
  const fillings = useOptionData(FillingService.getAllFillings);
  const frostings = useOptionData(FrostingService.getAllFrostings);
  const stylesData = useOptionData(StyleService.getAllStyles);

  const [cakeName, setCakeName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [cakeDescription, setCakeDescription] = useState("");
  const [price, setPrice] = useState("");

  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedFilling, setSelectedFilling] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrosting, setSelectedFrosting] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [notification, setNotification] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const cake = {
      name: cakeName,
      imgURL,
      flavor: selectedFlavor,
      filling: selectedFilling,
      size: selectedSize,
      frosting: selectedFrosting,
      style: selectedStyle,
      description: cakeDescription,
      type: "standard",
      price: price, //isAvailable is defaulted to 'true' in the JDBC code
    };

    CakeService.createCake(cake)
      .then(() => {
        setNotification({
          type: "success",
          message: "Cake Created Successfully",
        });

        setCakeName("");
        setImgURL("");
        setCakeDescription("");
        setPrice("");
        setSelectedFlavor("");
        setSelectedFilling("");
        setSelectedSize("");
        setSelectedFrosting("");
        setSelectedStyle("");

        setTimeout(() => setNotification(null), 3000);
      })
      .catch((error) => {
        // const message = error.response?.data?.message || "Create cake failed.";

        let message = "Create cake failed. Please provide all required data.";

        if (error.response) {
          if (error.response.data && error.response.data.message) {
            message = error.response.data.message;
          } else if (error.response.status === 400) {
            message = "Missing or invalid data. Please provide missing data.";
          } else if (error.response.status === 500) {
            message = "Server error. Please try again later.";
          }
        } else {
          message = "Network error. Please check your internet connection.";
        }

        setNotification({ type: "error", message });

        // setTimeout(() => setNotification(null), 3000);
      });
  }

  return (
    <div>
      <h1 className={styles.title}>Add New Cake</h1>

      {notification && (
        <div
          style={{
            color: notification.type === "success" ? "green" : "red",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {notification.message}
        </div>
      )}

<div className={styles.fullPage}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.itemBox}>
            <label htmlFor="cakeName">Cake Name</label>
            <input
              className={styles.cakeName}
              type="text"
              id="cakeName"
              placeholder="Enter Cake Name"
              value={cakeName}
              onChange={(e) => setCakeName(e.target.value)}
            />
          </div>

          <div className={styles.itemBox}>
            <label htmlFor="cakeDescription">Cake Description</label>
            <input
              className={styles.cakeDescription}
              type="text"
              id="cakeDescription"
              placeholder="Enter Cake Description"
              value={cakeDescription}
              onChange={(e) => setCakeDescription(e.target.value)}
            />
          </div>

          <div className={styles.itemBox}>
            <label htmlFor="imgURL">Image URL</label>
            <input
              className={styles.imgURL}
              type="text"
              id="imgURL"
              placeholder="Enter Image URL"
              value={imgURL}
              onChange={(e) => setImgURL(e.target.value)}
            />
          </div>

          <div className={styles.itemBox}>
            <label htmlFor="price">Price</label>
            <input
              className={styles.imgURL}
              type="number"
              min="0.00"
              id="price"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <Dropdown
          className={styles.itemBox}
            label="Size"
            options={sizes}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            placeholder="-- Choose a size --"
            optionKey="size"
            optionValue="size"
          />

          <Dropdown
          className={styles.itemBox}
            label="Flavor"
            options={flavors}
            value={selectedFlavor}
            onChange={(e) => setSelectedFlavor(e.target.value)}
            placeholder="-- Choose a flavor --"
            optionKey="flavor"
            optionValue="flavor"
          />

          <Dropdown
          className={styles.itemBox}
            label="Filling"
            options={fillings}
            value={selectedFilling}
            onChange={(e) => setSelectedFilling(e.target.value)}
            placeholder="-- Choose a filling --"
            optionKey="filling"
            optionValue="filling"
          />

          <Dropdown
          className={styles.itemBox}
            label="Frosting"
            options={frostings}
            value={selectedFrosting}
            onChange={(e) => setSelectedFrosting(e.target.value)}
            placeholder="-- Choose a frosting --"
            optionKey="frosting"
            optionValue="frosting"
          />

          <Dropdown
          className={styles.itemBox}
            label="Style"
            options={stylesData}
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            placeholder="-- Choose a style --"
            optionKey="style"
            optionValue="style"
          />
          <button type="submit" className={styles.button}>
            Add Cake
          </button>
        </div>

        {/* <div className={styles.button}></div> */}
      </form>
      </div>
    </div>
  );
}
