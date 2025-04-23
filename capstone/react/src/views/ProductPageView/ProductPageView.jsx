import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCakeContext } from "../../context/CakeContext";
import styles from "./ProductPageView.module.css";
import cakePic from "../HomeView/cake.png";

export default function ProductPageView() {
  const { selectCake } = useCakeContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const cakeId = parseInt(id);
  const cakeQuantity = 1;

  const [writing, setWriting] = useState("");

  function handleWritingChange(event) {
    setWriting(event.target.value);
  }
  function Dropdown(event) {
      setSelectedOption(event.target.value);
  }


  const handleBuyNow = () => {
    console.log("Navigating with writing:", writing); // debugging payload issue
    navigate("/checkout", { state: { cakeId, writing, cakeQuantity } });
  };

  return (
    <>
      <h1 className={styles.cakePage}>Cake Page</h1>
      <div className={styles.formContainer}>
      < img src={cakePic} alt="Bams Cakery" className={styles.cakePic} />
      <div className={styles.dropdown}>
      <div>
      <label htmlFor="dropdown">Cake Style:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Select">--Select--</option>
        <option value="Round">Round</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </select>
    </div>
    <div>
      <label htmlFor="dropdown">Cake Size:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Select">--Select--</option>
        <option value="Small">Small</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </select>
    </div>
    <div>
      <label htmlFor="dropdown">Cake Filling:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Select">--Select--</option>
        <option value="Chocolate">Chocolate</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </select>
    </div>
    <div>
      <label htmlFor="dropdown">Cake Frosting:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Select">--Select--</option>
        <option value="Butter Cream">Butter Cream</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </select>
    </div>
    </div>
      
      </div>
      <input
        type="text"
        placeholder="Write your message here, then click 'Buy Now'"
        value={writing}
        onChange={handleWritingChange}
        className={styles.writingInput}
      />
      
      <button className={styles.formButton} onClick={handleBuyNow}>Buy Now</button>
      
    
    </>

  );
}
