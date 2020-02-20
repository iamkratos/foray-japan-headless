import React, { useContext } from "react";
import styled from "styled-components";

import { StoreContext } from "../../context/StoreContext";

const AddToCart = ({ sizeId, sizeIdTwo, childProductSize }) => {
  console.log("add to cart check", sizeId, sizeIdTwo);
  const { addProductToCart, addMultipleProductsToCart } = useContext(
    StoreContext
  );
  return (
    <div className="add-to-cart-container">
      <div className="inner-wrap">
        {sizeIdTwo !== undefined && sizeIdTwo !== "" ? (
          <button
            onClick={() =>
              addMultipleProductsToCart(sizeId, sizeIdTwo, childProductSize)
            }
          >
            Add To Cart
          </button>
        ) : (
          <button
            className={
              sizeIdTwo !== undefined && sizeIdTwo === "" ? "disabled" : ""
            }
            disabled={
              sizeIdTwo !== undefined && sizeIdTwo === "" ? true : false
            }
            onClick={() => addProductToCart(sizeId)}
          >
            {sizeIdTwo !== undefined && sizeIdTwo === ""
              ? "Must Select Add-On Size"
              : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
