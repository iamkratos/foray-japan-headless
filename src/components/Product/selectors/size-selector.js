import React from "react";

const SizeSelector = ({
  allProductVariants,
  variantIndicator,
  addonSelectedSize,
  setAddonSelectedSize,
  setChildProductSize,
  childProductSize,
}) => {
  // 1. Sort for variants that have the indicator in them
  let indicator = variantIndicator;
  let variants = allProductVariants.variants;
  let availableSizeVariants = [];

  variants.length > 0 &&
    variants.map(variant => {
      let titleHandleized = "";
      titleHandleized = variant.title
        .replace(" / ", "-")
        .replace(/\{/g, "")
        .replace(/\//g, "-")
        .replace(/ /g, "-")
        .replace("&", "")
        .toLowerCase();

      let doesTheTitleMatchTheIndicator = titleHandleized.includes(indicator);

      if (doesTheTitleMatchTheIndicator) {
        availableSizeVariants.push(variant);
      }
    });

  // 2. Set first variant to be active

  function handleSizeChange(size) {
    let sizeText = size.selectedOptions[1]
      ? size.selectedOptions[1].value
      : size.selectedOptions[0].value;
    setAddonSelectedSize(size.shopifyId);
    setChildProductSize(size.selectedOptions[1].value);
  }

  return (
    <div className="variant-selector-container sizes">
      <h4>Select Size</h4>
      <ul>
        {availableSizeVariants.length > 0 &&
          availableSizeVariants.map((size, index) => {
            let isAvailable = size.availableForSale;
            let sizeText = size.selectedOptions[1]
              ? size.selectedOptions[1].value
              : size.selectedOptions[0].value;
            // console.log(
            //   "size",
            //   sizeText === size.selectedOptions[1].value,
            //   sizeText,
            //   size.selectedOptions[1].value
            // );
            return (
              <li key={index}>
                <button
                  disabled={!isAvailable}
                  className={
                    isAvailable && size.shopifyId === addonSelectedSize
                      ? "active"
                      : "" && (isAvailable ? "" : "disabled ")
                  }
                  onClick={() => handleSizeChange(size)}
                >
                  {sizeText}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SizeSelector;
