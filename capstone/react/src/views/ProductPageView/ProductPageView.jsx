import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCakeContext } from "../../context/CakeContext";
import styles from "./ProductPageView.module.css";

export default function ProductPageView() {
  const { selectCake } = useCakeContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const cakeId = parseInt(id);
  const cakeQuantity = 1;

  const [writing, setWriting] = useState("");

  function handleWritingChange(event) {
    setWriting(event.target.value);
  }


  const handleBuyNow = () => {
    console.log("Navigating with writing:", writing); // debugging payload issue
    navigate("/checkout", { state: { cakeId, writing, cakeQuantity } });
  };

  return (
    <>
      <h1>Product Page</h1>
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
