import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import useOptionData from "../../Components/useOptionData";

import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";
import PriceService from "../../services/OptionServices/PriceService";
import CakeService from "../../services/CakeService";

import styles from "./AddOptionView.module.css";

export default function AddOptionView() {
  // Using a custom reload trigger to force data refresh
  const [reloadTrigger, setReloadTrigger] = useState(0);
  
  // Modified to watch the reloadTrigger
  const sizes = useOptionData(SizeService.getAllSizes, [reloadTrigger]);
  const flavors = useOptionData(FlavorService.getAllFlavors, [reloadTrigger]);
  const fillings = useOptionData(FillingService.getAllFillings, [reloadTrigger]);
  const frostings = useOptionData(FrostingService.getAllFrostings, [reloadTrigger]);
  const stylesData = useOptionData(StyleService.getAllStyles, [reloadTrigger]);

  const [cakeName, setCakeName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [cakeDescription, setCakeDescription] = useState("");
  const [price, setPrice] = useState("");
  
  // Form input states
  const [flavorName, setFlavorName] = useState("");
  const [fillingName, setFillingName] = useState("");
  const [frostingName, setFrostingName] = useState("");
  const [sizeName, setSizeName] = useState("");
  const [styleName, setStyleName] = useState("");

  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedFilling, setSelectedFilling] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrosting, setSelectedFrosting] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [notification, setNotification] = useState(null);

  // Function to reload all data
  const reloadData = () => {
    setReloadTrigger(prev => prev + 1);
  };

  // Helper function to clear form inputs
  const clearInputs = () => {
    setFlavorName("");
    setFillingName("");
    setFrostingName("");
    setSizeName("");
    setStyleName("");
    // Keep dropdown selections as they are
  };

  // Chain promises to run sequentially and track success/failure
  const submitOptions = async (event) => {
    event.preventDefault();
    let hasError = false;
    
    // Create objects for the API
    const flavor = { flavor: flavorName };
    const filling = { filling: fillingName };
    const frosting = { frosting: frostingName };
    const size = { size: sizeName };
    const style = { style: styleName };
    
    
    try {
        if (flavorName) {
          try {
            await FlavorService.addFlavor(flavor);
            setNotification({ type: "success", message: "Flavor Created Successfully" });
          } catch (error) {
            throw new Error("Failed to create flavor");
          }
        }
    
        if (fillingName) {
          try {
            await FillingService.addFilling(filling);
            setNotification({ type: "success", message: "Filling Created Successfully" });
          } catch (error) {
            throw new Error("Failed to create filling");
          }
        }
    
        if (frostingName) {
          try {
            await FrostingService.addFrosting(frosting);
            setNotification({ type: "success", message: "Frosting Created Successfully" });
          } catch (error) {
            throw new Error("Failed to create frosting");
          }
        }
    
        if (sizeName) {
          try {
            await SizeService.addSize(size);
            setNotification({ type: "success", message: "Size Created Successfully" });
          } catch (error) {
            throw new Error("Failed to create size");
          }
        }
    
        if (styleName) {
          try {
            await StyleService.addStyle(style);
            setNotification({ type: "success", message: "Style Created Successfully" });
          } catch (error) {
            throw new Error("Failed to create style");
          }
        }
    
        reloadData();
        clearInputs();
      } catch (error) {
        setNotification({ type: "error", message: error.message });
      }
    };

  return (
    <div>
      <h1 className={styles.title}>Edit Options</h1>
      <form onSubmit={submitOptions}>
        <div className={styles.entirePage}>
          <div className={styles.formContainer}>
            <div className={styles.Column1}>
              <div className={styles.fillingContainer}>
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
                <Dropdown
                  label="Filling"
                  options={fillings}
                  value={selectedFilling}
                  onChange={(e) => setSelectedFilling(e.target.value)}
                  placeholder="Display Existing Fillings"
                  optionKey="filling"
                  optionValue="filling"
                />
              </div>

              <div className={styles.frostingContainer}>
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
                <Dropdown
                  label="Frosting"
                  options={frostings}
                  value={selectedFrosting}
                  onChange={(e) => setSelectedFrosting(e.target.value)}
                  placeholder="Display Existing Frostings"
                  optionKey="frosting"
                  optionValue="frosting"
                />
              </div>
      
              <div className={styles.flavorContainer}>
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
                <Dropdown
                  label="Flavor"
                  options={flavors}
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  placeholder="Display Existing Flavors"
                  optionKey="flavor"
                  optionValue="flavor"
                />
              </div>
            </div> 
            {/* end of column 1 */}

            <div className={styles.Column2}>
              <div className={styles.sizeContainer}>
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
                <Dropdown
                  label="Size"
                  options={sizes}
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  placeholder="Display Existing Sizes"
                  optionKey="size"
                  optionValue="size"
                />
              </div>
      
              <div className={styles.styleContainer}>
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
                <Dropdown
                  label="Style"
                  options={stylesData}
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  placeholder="Display Existing Styles"
                  optionKey="style"
                  optionValue="style"
                />
              </div>
            </div>
            {/* end of column 2 */}
          </div>
          
          <button type="submit" className={styles.button}>
            Click here to save your new options
          </button>
          
          {notification && (
            <div className={`${styles.notification} ${styles[notification.type]}`}>
              {notification.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}