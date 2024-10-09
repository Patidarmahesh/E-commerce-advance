import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getallDataOfProduct = () => {
    let localCartItemGet = localStorage.getItem("cart");
    if (localCartItemGet) {
      let data = JSON.parse(localCartItemGet);
      // const cartFilter = data.filter(
      //   (product, index) =>
      //     data.findIndex(
      //       (item) => item.name === product.name) === index
      // );
      setCart(data);
      localStorage.setItem("cart", JSON.stringify(data));
    }
  };

  useEffect(() => {
    getallDataOfProduct();
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContextProvider;
