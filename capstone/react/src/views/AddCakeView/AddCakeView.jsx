import styles from "./AddCakeView.module.css";
import { useState, useEffect } from "react";
import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";
import CakeService from "../../services/CakeService";

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

  const [cakeName, setCakeName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [cakeDescription, setCakeDescription] = useState("");
  const [notification, setNotification] = useState(null);

  //handles submission to Database
  function handleSubmit(event) {
    event.preventDefault();

    // build the cake object
    const cake = {
      name: cakeName,
      imageUrl: imgURL,
      flavorId: selectedFlavor,
      fillingId: selectedFilling,
      sizeId: selectedSize,
      frostingId: selectedFrosting,
      styleId: selectedStyle,
    };

    CakeService.createCake(cake)
      .then(() => {
        setNotification({
          type: "success",
          message: "Cake Created Successfully",
        });
      })
      .catch((error) => {
        // Check for a response message, but display a default if that doesn't exist
        const message = error.response?.data?.message || "Create cake failed.";
        setNotification({ type: "error", message });
      });
  }

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

  const handleNameChange = (e) => {
    setCakeName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setCakeDescription(e.target.value);
  };

  const handleImgURLChange = (e) => {
    setImgURL(e.target.value);
  };

  return (
    <div>
      {/* //5 dropdowns forms that connect with each option
          // 1 textbox for the cakename
          //1 tetxbox that accepts image URL */}
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.cakeNameBox}>
            <label htmlFor="cakeName">Cake Name</label>
            <input
              className={styles.cakeName}
              type="text"
              id="cakeName"
              placeholder="Enter Cake Name"
              onChange={handleNameChange}
            />
          </div>

          <div className={styles.cakeDescriptionBox}>
            <label htmlFor="cakeName">Cake Description</label>
            <input
              className={styles.cakeDescription}
              type="text"
              id="cakeDescription"
              placeholder="Enter Cake Description"
              onChange={handleDescriptionChange}
            />
          </div>

          <div className={styles.imgURLBox}>
            <label htmlFor="imgURL">Image URL</label>
            <input
              className={styles.imgURL}
              type="text"
              id="imgURL"
              placeholder="Enter Image URL"
              onChange={handleImgURLChange}
            />
          </div>

          <div>
            <label>Size</label>
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
          </div>

          <div>
            <label>Flavor</label>
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
          </div>

          <div>
            <label>Filling</label>
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
          </div>

          <div>
            <label>Frosting</label>
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
          </div>

          <div>
            <label>Style</label>
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
          </div>
        </div>
        <div className={styles.button}>
          <button type="submit">Add Cake</button>
        </div>
      </form>
    </div>
  );
}
