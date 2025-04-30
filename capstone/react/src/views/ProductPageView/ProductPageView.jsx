import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductPageView.module.css";
import CakeService from "../../services/CakeService";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export default function ProductPageView() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const cakeId = parseInt(id);

  const [writing, setWriting] = useState("");
  const [cake, setCake] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  // const handleBuyNow = () => {
  //   navigate("/checkout", { state: { cakeId, writing, quantity } });
  // };

  const handleAddToCart = () => {
    navigate("/cart");
    addToCart({ ...cake, quantity: quantity, writing: writing });
  };

  return (
    <>
      <h1 className={styles.cakeHeader}> {cake ? cake.name : "Loading..."}</h1>

      <div className={styles.pageContainer}>
        <img
          src={cake ? cake.imgURL : "Loading..."}
          alt={cake ? cake.name : "Loading..."}
          className={styles.cakePic}
        />
        <div className={styles.cakeInfoContainer}>
          
          <label>Cake Style</label>
          <p>{cake ? cake.style : "Loading..."}</p>
          <label>Cake Flavor</label>
          <p>{cake ? cake.flavor : "Loading..."}</p>
          <label>Cake Price</label>
          <p> $ {cake ? cake.price : "Loading..."}</p>
          <label>Cake Filling</label>
          <p>{cake ? cake.filling : "Loading..."}</p>
          <label>Cake Size</label>
          <p>{cake ? cake.size : "Loading..."}</p>
          <label>Cake Frosting</label>
          <p>{cake ? cake.frosting : "Loading..."}</p>
          
            <label htmlFor="quantity">Cake Quantity</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.quantityInput}
              placeholder="Enter quantity"
            />
        
          <label>Cake Description</label>
          <p>{cake ? cake.description : "Loading..."}</p>
        </div>
      </div>
      <div className={styles.line}>
        <input
          type="text"
          placeholder="Write your message here"
          value={writing}
          onChange={handleWritingChange}
          className={styles.writingInput}
        />
      </div>
      <div className={styles.line}>
        {/* <button className={styles.formButton} onClick={handleBuyNow}>
          Buy Now
        </button> */}
        <button className={styles.formButton} onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </>
  );
}
