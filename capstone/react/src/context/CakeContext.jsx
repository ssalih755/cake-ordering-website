import { createContext, useContext, useState } from "react";

export const CakeContext = createContext(null);

export const CakeProvider = ({ children }) => {
  const [selectedCake, setSelectedCake] = useState([]);

  const selectCake = (cakeId, cakeQuantity) => {
    setSelectedCake({ cakeId, cakeQuantity });
  };

  const clearCake = () => setSelectedCake(null);

  return (
    <CakeContext.Provider value={{ selectedCake, selectCake, clearCake }}>
      {children}
    </CakeContext.Provider>
  );
};

export const useCakeContext = () => useContext(CakeContext);
