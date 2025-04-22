import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCakeContext } from "../../context/CakeContext";
import styles from "./ProductPageView.module.css";

export default function ProductPageView() {
  const { selectCake } = useCakeContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const cakeId = parseInt(id);
  const cakeQuantity = 1; // Hardcoded quantity for now

  const handleBuyNow = () => {
    //selectCake(cake.id, 1); // Always 1 quantity for now
    navigate("/checkout", { state: { cakeId, cakeQuantity } });
  };

  return (
    <>
      <button onClick={handleBuyNow}>Buy Now</button>
    </>
  );
}
