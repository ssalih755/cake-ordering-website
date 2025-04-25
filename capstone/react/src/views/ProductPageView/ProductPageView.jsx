import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCakeContext } from "../../context/CakeContext";
import styles from "./ProductPageView.module.css";
import CakeService from "../../services/CakeService";

export default function ProductPageView() {
 
  const { id } = useParams();
  const navigate = useNavigate();

  const cakeId = parseInt(id);
  const cakeQuantity = 1;
  
 
  const [writing, setWriting] = useState("");
  const[cake, setCake] = useState(null);
  useEffect(() => {
    CakeService.getCakeById(cakeId)
      .then((response) => {
        const fetchedCake = response.data;
        setCake(fetchedCake);
      })
      .catch((error) => {
        console.error("Error fetching cake:", error);
      });
  }, [cakeId, setCake]); // Only depend on cakeId and selectCake
  
  function handleWritingChange(event) {
    setWriting(event.target.value);
  }


  const handleBuyNow = () => {
  
    navigate("/checkout", { state: { cakeId, writing, cakeQuantity } });
  };
 

  return (
    <>
    <div className={styles.pageContainer}>
    <h1>{cake ? cake.name : "Loading..."}</h1>
    
   
    <img src={cake ? cake.imgURL : "Loading..."} alt={cake ? cake.name : "Loading..."} />
    <p>{cake ? cake.price : "Loading..."}</p>
    <p>{cake ? cake.description : "Loading..."}</p>
    <p>{cake ? cake.flavor : "Loading..."}</p>
    <p>{cake ? cake.size : "Loading..."}</p>
    <p>{cake ? cake.quantity : "Loading..."}</p>
   
    <p>{cake ? cake.filling : "Loading..."}</p>
    <p>{cake ? cake.frosting : "Loading..."}</p>
    <p>{cake ? cake.style : "Loading..."}</p>
      <input
        type="text"
        placeholder="Write your message here, then click 'Buy Now'"
        value={writing}
        onChange={handleWritingChange}
        className={styles.writingInput}
      />
      <button className={styles.formButton} onClick={handleBuyNow}>Buy Now</button>
    </div>
    </>
  );
}
