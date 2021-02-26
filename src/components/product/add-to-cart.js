import React, { useContext } from "react";

import { StoreContext } from "../../context/StoreContext";

const AddToCart = ({
  sizeId,
  sizeIdTwo,
  childProductSize,
  childProductColor,
  availSizes,
  addon,
  em,
  emDesign,
}) => {
  const {
    addProductToCart,
    addMultipleProductsToCart,
    addProductWithEmToCart,
  } = useContext(StoreContext);
  return (
    <div className="add-to-cart-container">
      <div className="inner-wrap">
        {addon === true && availSizes > 0 ? (
          <button
            className={
              sizeIdTwo !== undefined && sizeIdTwo === "" ? "disabled" : ""
            }
            onClick={() =>
              addMultipleProductsToCart(
                sizeId,
                sizeIdTwo,
                childProductSize,
                childProductColor
              )
            }
          >
            {sizeIdTwo !== undefined && sizeIdTwo === ""
              ? "Must Select Add-On Size"
              : "Add To Cart"}
          </button>
        ) : em === true ? (
          <button
            className={availSizes === 0 ? "disabled" : ""}
            disabled={availSizes === 0 ? true : false}
            onClick={() => addProductWithEmToCart(sizeId, emDesign)}
          >
            {availSizes === 0 ? "Sold Out" : "Add To Cart"}
          </button>
        ) : (
          <button
            className={availSizes === 0 ? "disabled" : ""}
            disabled={availSizes === 0 ? true : false}
            onClick={() => addProductToCart(sizeId)}
          >
            {availSizes === 0 ? "Sold Out" : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
