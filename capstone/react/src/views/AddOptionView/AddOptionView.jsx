import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import useOptionData from "../../Components/useOptionData";

import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";
import PriceService from "../../services/OptionServices/PriceService";
import CakeService from "../../services/CakeService";

import styles from "./AddCakeView.module.css";

export default function AddOptionView() {
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
      price: price,
    };

    const flavor = {
      flavor: flavorName,
    };

    const filling = {
      filling: fillingName,
    };

    const frosting = {
      frosting: frostingName,
    };

    const size = {
      size: sizeName,
      style: selectedStyle,
    };

    const style = {
      style: styleName,
    };

    //********************************** */
    FrostingService.addFrosting(frosting)
      .then(() =>
        setNotification({
          type: "success",
          message: "Frosting Created Successfully",
        })
      )
      .catch((error) => {
        const message =
          error.response?.data?.message || "Create frosting failed.";
        setNotification({ type: "error", message });
      });

    //********************************** */

    FillingService.addFilling(filling)
      .then(() =>
        setNotification({
          type: "success",
          message: "FIlling Created Successfully",
        })
      )
      .catch((error) => {
        const message =
          error.response?.data?.message || "Create filling failed.";
        setNotification({ type: "error", message });
      });

    //********************************** */

    FlavorService.addFlavor(flavor)
      .then(() =>
        setNotification({
          type: "success",
          message: "Flavor Created Successfully",
        })
      )
      .catch((error) => {
        const message =
          error.response?.data?.message || "Create flavor failed.";
        setNotification({ type: "error", message });
      });

    //********************************** */

    SizeService.addSize(size)
      .then(() =>
        setNotification({
          type: "success",
          message: "Size Created Successfully",
        })
      )
      .catch((error) => {
        const message = error.response?.data?.message || "Create size failed.";
        setNotification({ type: "error", message });
      });

    //********************************** */

    FrostingService.addFrosting(frosting)
      .then(() =>
        setNotification({
          type: "success",
          message: "Frosting Created Successfully",
        })
      )
      .catch((error) => {
        const message =
          error.response?.data?.message || "Create frosting failed.";
        setNotification({ type: "error", message });
      });

    //********************************** */

    StyleService.addStyle(style)
      .then(() =>
        setNotification({
          type: "success",
          message: "Style Created Successfully",
        })
      )
      .catch((error) => {
        const message = error.response?.data?.message || "Create Style failed.";
        setNotification({ type: "error", message });
      });
    //********************************** */

    return (
      <div>
        <h1 className={styles.title}>Add New Cake</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <div className={styles.cakeNameBox}>
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

            <div className={styles.fillingNameBox}>
              <label htmlFor="fillingName">Filling Name</label>
              <input
                className={styles.optionName}
                type="text"
                id="fillingName"
                placeholder="Enter filling Name"
                value={fillingName}
                onChange={(e) => setFillingName(e.target.value)}
              />
            </div>

           

            <div className={styles.frostingNameBox}>
              <label htmlFor="frostingName">Frosting Name</label>
              <input
                className={styles.optionName}
                type="text"
                id="frostingName"
                placeholder="Enter frosting Name"
                value={frostingName}
                onChange={(e) => setFrostingName(e.target.value)}
              />
            </div>

            <div className={styles.flavorNameBox}>
              <label htmlFor="flavorName">Flavor Name</label>
              <input
                className={styles.optionName}
                type="text"
                id="flavorName"
                placeholder="Enter flavor Name"
                value={flavorName}
                onChange={(e) => setFlavorName(e.target.value)}
              />
            </div>

            <div className={styles.sizeNameBox}>
              <label htmlFor="sizeName">Size Name</label>
              <input
                className={styles.optionName}
                type="text"
                id="sizeName"
                placeholder="Enter size Name"
                value={sizeName}
                onChange={(e) => setSizeName(e.target.value)}
              />
            </div>

            <div className={styles.styleNameBox}>
              <label htmlFor="styleName">Style Name</label>
              <input
                className={styles.optionName}
                type="text"
                id="styleName"
                placeholder="Enter style Name"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
              />
            </div>

            

            <div className={styles.price}>
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
              label="Size"
              options={sizes}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              placeholder="-- Choose a size --"
              optionKey="size"
              optionValue="size"
            />

            <Dropdown
              label="Flavor"
              options={flavors}
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              placeholder="-- Choose a flavor --"
              optionKey="flavor"
              optionValue="flavor"
            />

            <Dropdown
              label="Filling"
              options={fillings}
              value={selectedFilling}
              onChange={(e) => setSelectedFilling(e.target.value)}
              placeholder="-- Choose a filling --"
              optionKey="filling"
              optionValue="filling"
            />

            <Dropdown
              label="Frosting"
              options={frostings}
              value={selectedFrosting}
              onChange={(e) => setSelectedFrosting(e.target.value)}
              placeholder="-- Choose a frosting --"
              optionKey="frosting"
              optionValue="frosting"
            />

            <Dropdown
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
    );
  }
}
