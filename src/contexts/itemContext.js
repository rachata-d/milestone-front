import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext();

function ItemContextProvider({ children }) {
  const fetchItem = async () => {
    const itemData = await axios.get("/items");
    return itemData.data.items;
  };

  return (
    <ItemContext.Provider value={{ fetchItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItem = () => {
  return useContext(ItemContext);
};

export default ItemContextProvider;
