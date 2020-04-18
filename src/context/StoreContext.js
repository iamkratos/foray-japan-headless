import React, { createContext, useEffect, useState } from "react";
import Client from "shopify-buy";
import { document } from "browser-monads";

const client = Client.buildClient({
  domain: "foray-golf-dev.myshopify.com",
  storefrontAccessToken: "5b871ba787e3d8597fcba89d138305fa",
});

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  toggleCartClose: () => {},
  cart: [],
  addProductToCart: () => {},
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
  const isBrowser = typeof window != "undefined";

  const toggleCartOpen = () => {
    setCartOpen(!isCartOpen);
    document.querySelector("html").classList.add("frozen");
    document.querySelector("body").classList.add("frozen");
  };
  const toggleCartClose = () => {
    setCartOpen(false);
    document.querySelector("html").classList.remove("frozen");
    document.querySelector("body").classList.remove("frozen");
  };

  // This handles all color filtering. Only use for Filters
  const colorHandlize = colorInNormalText => {
    let alteredColor = colorInNormalText
      .replace(" / ", "-")
      .replace(/\s+/g, "-")
      .replace(/\{/g, "")
      .replace(/\//g, "-")
      .replace("&", "")
      .toLowerCase();
    return alteredColor;
  };
  const reverseColorHandlize = colorHandle => {
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    let alteredColor = colorHandle.replace(/-/g, " ");
    alteredColor = toTitleCase(alteredColor);
    return alteredColor;
  };

  const colorHandlizeAndReplaceSimilarColors = colorInNormalText => {
    let alteredColor = colorInNormalText
      .replace("Rosso ", "")
      .replace("Nero ", "")
      .replace(/\s+/g, "-")
      .replace(/\{/g, "")
      .replace(/\//g, "-")
      .replace("&", "")
      .toLowerCase();
    return alteredColor;
  };

  // function handleProductGridItemVariantChange(colorHandle, product) {

  // }

  useEffect(() => {
    initializeCheckout();
  }, []);

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create();
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const initializeCheckout = async () => {
    try {
      // Check if it's a browser

      // Check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null;

      let newCheckout = null;

      if (currentCheckoutId) {
        // If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId);
        // console.log("context case 1");
        if (newCheckout && newCheckout.completedAt) {
          newCheckout = await getNewId();
          // console.log("context case 2");
        }
        console.log("case 1");
        setCheckout(newCheckout);
      } else {
        // If id does not, create new checkout
        // console.log("context case 3");
        newCheckout = await client.checkout.create();
        if (isBrowser) {
          localStorage.setItem("checkout_id", newCheckout.id);
        }
        console.log("case 2");
        setCheckout(newCheckout);
      }
      // Set checkout to state
    } catch (e) {
      console.log(e.message);
      localStorage.removeItem("checkout_id");
    }
  };

  // NOTE: newCheckout is dif here than the function above
  const addProductToCart = async variantId => {
    try {
      console.log("checkout", checkout);
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ];
      console.log("new checkout", checkout.id, lineItems);
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      );
      setCheckout(newCheckout);
      if (!isCartOpen) {
        toggleCartOpen();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const addMultipleProductsToCart = async (
    variantIdOne,
    variantIdTwo,
    childProductSize
  ) => {
    try {
      const lineItems = [
        {
          variantId: variantIdOne,
          quantity: 1,
          customAttributes: [
            { key: "childProductSize", value: childProductSize },
          ],
        },
        {
          variantId: variantIdTwo,
          quantity: 1,
        },
      ];
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      );
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

  const removeMultipleProductsFromCart = async lineItemIds => {
    try {
      const newCheckout = await client.checkout.removeLineItems(
        checkout.id,
        lineItemIds
      );
      // console.log(newCheckout.webUrl);
      setCheckout(newCheckout);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateQuantityInCart = async (lineItemId, value) => {
    try {
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

  const updateMultipleQuantitiesInCart = async updatedLineItems => {
    try {
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
        addMultipleProductsToCart,
        updateQuantityInCart,
        updateMultipleQuantitiesInCart,
        removeProductFromCart,
        removeMultipleProductsFromCart,
        checkout,
        toggleCartOpen,
        isCartOpen,
        toggleCartClose,
        colorHandlize,
        reverseColorHandlize,
        colorHandlizeAndReplaceSimilarColors,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
