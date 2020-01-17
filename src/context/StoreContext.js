import React, { createContext, useEffect, useState } from "react";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "foray-golf-dev.myshopify.com",
  storefrontAccessToken: "5b871ba787e3d8597fcba89d138305fa",
});

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {
    console.log("boo!");
  },
  removeProductFromCart: () => {},
  formatMoney: value => {
    var num = "$" + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return num;
  },
  client,
  checkout: {
    lineItems: [],
  },
};

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setCartOpen(!isCartOpen);
  };

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

  // NOTE: newCheckout is dif here than the function above
  const addProductToCart = async variantId => {
    try {
      console.log("added");
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ];
      console.log(client.checkout);
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      );
      console.log(newCheckout.webUrl);
      setCheckout(newCheckout);
      if (!isCartOpen) {
        toggleCartOpen();
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const removeProductFromCart = async lineItemId => {
    try {
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ]);
      // console.log(newCheckout.webUrl);
      setCheckout(newCheckout);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateQuantityInCart = async (lineItemId, value) => {
    try {
      console.log("line item", lineItemId);
      let updatedLineItems = {
        id: lineItemId.id,
        quantity: value,
        variantId: lineItemId.variant.id,
      };

      const newCheckout = await client.checkout.updateLineItems(
        checkout.id,
        updatedLineItems
      );
      setCheckout(newCheckout);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addProductToCart,
        updateQuantityInCart,
        removeProductFromCart,
        checkout,
        toggleCartOpen,
        isCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
