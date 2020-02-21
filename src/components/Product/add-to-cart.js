import React, { useContext } from "react";
import styled from "styled-components";

import { StoreContext } from "../../context/StoreContext";

const AddToCart = ({
  sizeId,
  sizeIdTwo,
  childProductSize,
  availSizes,
  addon,
}) => {
  const { addProductToCart, addMultipleProductsToCart } = useContext(
    StoreContext
  );
  return (
    <div className="add-to-cart-container">
      <div className="inner-wrap">
        {addon === true ? (
          <button
            className={
              sizeIdTwo !== undefined && sizeIdTwo === "" ? "disabled" : ""
            }
            onClick={() =>
              addMultipleProductsToCart(sizeId, sizeIdTwo, childProductSize)
            }
          >
            {sizeIdTwo !== undefined && sizeIdTwo === ""
              ? "Must Select Add-On Size"
              : "Add To Cart"}
          </button>
        ) : (
          <button
            className={availSizes == 0 ? "disabled" : ""}
            disabled={availSizes == 0 ? true : false}
            onClick={() => addProductToCart(sizeId)}
          >
            {availSizes == 0 ? "Sold Out" : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
