import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import useOptionData from "../../Components/useOptionData";
import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";
import OptionTable from "../../components/OptionTable/OptionTable";
import styles from "./AddOptionView.module.css";
import { useNavigate } from "react-router-dom";

export default function AddOptionView() {
  const navigate = useNavigate();
  // Using a custom reload trigger to force data refresh
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Modified to watch the reloadTrigger
  const sizes = useOptionData(SizeService.getAllSizes, [reloadTrigger]);
  const flavors = useOptionData(FlavorService.getAllFlavors, [reloadTrigger]);
  const fillings = useOptionData(FillingService.getAllFillings, [
    reloadTrigger,
  ]);
  const frostings = useOptionData(FrostingService.getAllFrostings, [
    reloadTrigger,
  ]);
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
  const [notification, setNotification] = useState(null);

  
  // Function to reload all data
  const reloadData = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  // Helper function to clear form inputs
  const clearInputs = () => {
    setFlavorName("");
    setFillingName("");
    setFrostingName("");
    setSizeName("");
    setStyleName("");
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
          setNotification({
            type: "success",
            message: "Flavor Created Successfully",
          });
        } catch (error) {
          throw new Error("Failed to create flavor");
        }
      }

      if (fillingName) {
        try {
          await FillingService.addFilling(filling);
          setNotification({
            type: "success",
            message: "Filling Created Successfully",
          });
        } catch (error) {
          throw new Error("Failed to create filling");
        }
      }

      if (frostingName) {
        try {
          await FrostingService.addFrosting(frosting);
          setNotification({
            type: "success",
            message: "Frosting Created Successfully",
          });
        } catch (error) {
          throw new Error("Failed to create frosting");
        }
      }

      if (sizeName) {
        try {
          await SizeService.addSize(size);
          setNotification({
            type: "success",
            message: "Size Created Successfully",
          });
        } catch (error) {
          throw new Error("Failed to create size");
        }
      }

      if (styleName) {
        try {
          await StyleService.addStyle(style);
          setNotification({
            type: "success",
            message: "Style Created Successfully",
          });
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
      <form onSubmit={submitOptions} >
        <div className={styles.entirePage}>
          <p className={styles.warning}>
            {" "}
            Not all fields are required in order to save new options.
          </p>
          <p className={styles.warning}>
            {" "}
            Duplicate options will not be saved.{" "}
          </p>
          <div className={styles.formContainer}>
            <div className={styles.tablesContainer}>
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

                <OptionTable className options={fillings} optionKey="filling" />
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

                <OptionTable options={frostings} optionKey="frosting" />
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

                <OptionTable options={flavors} optionKey="flavor" />
              </div>

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

                <OptionTable options={sizes} optionKey="size" />
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

                <OptionTable options={stylesData} optionKey="style" />
              </div>
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Save
          </button>

          {notification && (
            <div
              className={`${styles.notification} ${styles[notification.type]}`}
            >
              {notification.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
