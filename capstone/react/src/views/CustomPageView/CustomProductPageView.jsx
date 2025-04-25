import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCakeContext } from "../../context/CakeContext";
import styles from "./CustomProductPageView.module.css";
import cakePic from "../HomeView/cake.png";
import CakeService from "../../services/CakeService";
import CakeCard from "../../components/CakeCard/CakeCard";
import { UserContext } from "../../context/UserContext"

import Dropdown from "../../components/Dropdown";
import useOptionData from "../../Components/useOptionData";

import FlavorService from "../../services/OptionServices/FlavorService";
import FillingService from "../../services/OptionServices/FillingService";
import SizeService from "../../services/OptionServices/SizeService";
import FrostingService from "../../services/OptionServices/FrostingService";
import StyleService from "../../services/OptionServices/StyleService";

export default function ProductPageView() {
  //const { selectCake } = useCakeContext([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState();
  const [imgURL, setImgURL] = useState("");
  const [cake, setCake] = useState();
    const sizes = useOptionData(SizeService.getAllSizes);
    const flavors = useOptionData(FlavorService.getAllFlavors);
    const fillings = useOptionData(FillingService.getAllFillings);
    const frostings = useOptionData(FrostingService.getAllFrostings);
    const stylesData = useOptionData(StyleService.getAllStyles);
    const [selectedFlavor, setSelectedFlavor] = useState("");
    const [selectedFilling, setSelectedFilling] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedFrosting, setSelectedFrosting] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("");
    const [notification, setNotification] = useState(null);
    
   
 
    function handleSubmit(event) {
      event.preventDefault();
  
      const cake = {
        name: "Custom Cake", 
        imgURL,
        flavor: selectedFlavor,
        filling: selectedFilling,
        size: selectedSize,
        frosting: selectedFrosting,
        style: selectedStyle,
        description: "Custom Cake",
        type: "Custom",
        price: 75.00,
      };
  
      CakeService.createCake(cake)
        .then(response =>{
          navigate("/checkout", {
            state: { cakeId: response.data.id, writing, cakeQuantity, cakeType: response.data.type },
          });
        ;
          setNotification({
            type: "success",
            message: "Cake Created Successfully",
            
          })
    })
        .catch((error) => {
          const message = error.response?.data?.message || "Create cake failed.";
          setNotification({ type: "error", message });
        });
    }

 
  const cakeQuantity = 1;

  const [writing, setWriting] = useState("");

  function handleWritingChange(event) {
    setWriting(event.target.value);
  }
  


  const handleBuyNow = () => {
    console.log("Navigating with writing:", writing); // debugging payload issue

  };

  return (
    <>
      <h1 className={styles.cakePage}>Custom Cake Page</h1>
      <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
      < img src={cakePic} alt="Bams Cakery" className={styles.cakePic} />
      <div className={styles.dropdown} >
      <div >
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
        placeholder="Write your message here, then click 'Buy Now'"
        value={writing}
        onChange={handleWritingChange}
        className={styles.writingInput}
      />
      
      <button 
      type="submit"
      className={styles.formButton} 
      onClick={handleBuyNow}
      
      >
       Buy Now</button>
     </section>
     </form>
    </>
    

  );
}
