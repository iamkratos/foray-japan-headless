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
      // Check if it's a browser
      const isBrowser = typeof window != "undefined";

      // Check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null;
      console.log(currentCheckoutId, "currentCheckoutId");

      let newCheckout = null;

      if (currentCheckoutId) {
        // If id exists, fetch checkout from Shopify
        console.log("case 1", client.checkout);
        newCheckout = await client.checkout.fetch(currentCheckoutId);
        console.log("case 1", newCheckout);
      } else {
        // If id does not, create new checkout
        console.log("case 2");
        newCheckout = await client.checkout.create();
        localStorage.setItem("checkout_id", newCheckout.id);
      }
      // Set checkout to state
      console.log("new checkout is", newCheckout);
      setCheckout(newCheckout);
      console.log("checkout set", checkout);
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
      console.log(checkout);
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
