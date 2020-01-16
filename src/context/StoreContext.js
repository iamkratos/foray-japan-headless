import React, { createContext, useEffect, useState } from "react";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "foray-golf-dev.myshopify.com",
  storefrontAccessToken: "5b871ba787e3d8597fcba89d138305fa",
});

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {
    console.log("boo!");
  },
  formatMoney: value => {
    var num = "$" + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return num;
  },
  client,
};

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState({});

  useEffect(() => {
    initializeCheckout();
  }, []);

  const initializeCheckout = async () => {
    try {
      const newCheckout = await client.checkout.create();
      setCheckout(newCheckout.id);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addProductToCart = async variantId => {
    try {
      console.log("added");
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ];
      const addItems = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      );
      console.log(addItems.webUrl);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addProductToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
