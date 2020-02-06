import React, { useContext } from "react";
import styled from "styled-components";

import { StoreContext } from "../../context/StoreContext";

const AddToCart = ({ sizeId, sizeIdTwo }) => {
  console.log("id 2", sizeIdTwo);
  const { addProductToCart, addMultipleProductsToCart } = useContext(
    StoreContext
  );
  return (
    <div className="add-to-cart-container">
      <div className="inner-wrap">
        {sizeIdTwo !== null || sizeIdTwo !== "" ? (
          <button onClick={() => addMultipleProductsToCart(sizeId, sizeIdTwo)}>
            Add To Cart
          </button>
        ) : (
          <button onClick={() => addProductToCart(sizeId)}>Add To Cart</button>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
