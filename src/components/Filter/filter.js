import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import styled from "styled-components";

import { TransitionMixin, media } from "../helpers";

const FilterContainer = styled.div`
  flex: 1;
  position: fixed;
  left: 0;
  top: calc(100% - 40px);
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  transform: translate3d(0px, 0%, 0px);
  height: 80vh;
  ${TransitionMixin(".25s")}
  ${media.medium`z-index: 100; position: static; `}

  &.active {
    transform: translate3d(0px, -60%, 0px);
  }

  > .inner-wrap {
    max-width: 90vw;
    margin: 0 auto;

    .scroll-container {
      max-height: 300px;
      overflow-y: scroll;
      ${media.medium`max-height: 100%; overflow-y: initial;`}
    }
  }

  .filter-mobile-trigger {
    height: 40px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media.medium`display: none;`}

    button {
      color: #fff;
      font-weight: bold;
      width: 100%;
      height: 100%;
      -webkit-appearance: none;
      background-color: #000;
    }
  }

  .color-container {
    .colors {
      display: flex;
      flex-wrap: wrap;
      ${media.medium`margin-left: -6px;`}
    }
  }

  .current-filter {
    margin-bottom: 20px;
    .title-container {
      padding: 20px 0 0;
      ${media.medium`padding: 0;`}
      h1 {
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 0 20px;
        padding-bottom: 5px;
        border-bottom: 2px solid #ccc;
        display: inline-block;
      }
    }
    button {
      display: block;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 12px;
      border: none;
      box-shadow: none;
      padding: 0px;
      color: #777;
      background-color: #fff;
    }
  }

  .filter-title {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .color-filter-container {
    margin-bottom: 50px;
  }

  .size-filter-container {
    .size-container {
      .sizes {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0px;
        ${media.medium`margin: 0 0 0 -6px;`}

        li {
          list-style: none;
          margin: 2px 5px;

          &.size-xxs {
            order: 1;
          }

          &.size-xs {
            order: 2;
          }

          &.size-s {
            order: 3;
          }

          &.size-m {
            order: 4;
          }

          &.size-l {
            order: 5;
          }
          &.size-xl {
            order: 6;
          }
          &.size-0 {
            order: 7;
          }
          &.size-2 {
            order: 8;
          }
          &.size-4 {
            order: 9;
          }
          &.size-6 {
            order: 10;
          }
          &.size-8 {
            order: 11;
          }
          &.size-10 {
            order: 12;
          }
          &.size-12 {
            order: 13;
          }
          &.size-14 {
            order: 14;
          }
          &.size-xs-s {
            order: 15;
          }
          &.size-m-l {
            order: 16;
          }
          &.size-os {
            order: 17;
          }
          &.size-o-s {
            order: 18;
          }
          &.size-2-3-y {
            order: 19;
          }
          &.size-4-5-y {
            order: 20;
          }
          &.size-6-7-y {
            order: 21;
          }
          &.size-8-9-y {
            order: 22;
          }
          button {
            border: 1px solid #000;
            padding: 0px;
            font-weight: bold;
            font-size: 12px;
            line-height: 1;
            padding: 5px;
            min-width: 82px;
            background-color: #fff;
            -webkit-appearance: none;
            ${TransitionMixin(".25s")}

            &.active, &:hover {
              background-color: #000;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .tags-container {
    margin-top: 50px;
    .features-container {
      .features {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0px;
        list-style: none;
        ${media.medium`margin: 0 0 0 -6px;`}
        li {
          margin: 2px 5px 7px;
          flex: 0 0 45%;

          button {
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
            font-size: 11px;
            border: 1px solid #000;
            background-color: transparent;
            border-radius: 24px;
            line-height: 1;
            padding: 6px 5px 5px;
            width: 100%;
            ${TransitionMixin(".25s")}

            &.active,
            &:hover {
              background-color: #000;
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

const ProductFilter = ({
  products,
  filterColor,
  setFilterColor,
  filterSize,
  setFilterSize,
  filteredProducts,
  setFilteredProducts,
  handleResetFilters,
  setTootipColor,
  tooltipColor,
  collection,
  currentColorTooltip,
  setCurrentColorTooltip,
  filterFeature,
  setFilterFeature,
}) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const { colorHandlize, colorHandlizeAndReplaceSimilarColors } = useContext(
    StoreContext
  );

  // Mobile Fitler
  const [toggleMobileFilter, setToggleMobileFilter] = useState(false);

  function handleMobileFilterToggle() {
    setToggleMobileFilter(!toggleMobileFilter);
  }

  //   1. Find All Unique Values of Color Variant

  let finalColors = [];
  products.map(product => {
    product.variants.map(variants => {
      // -- Filter Duplicate Colors
      variants.selectedOptions.map(option => {
        if (option.name === "Color") {
          finalColors.push(option.value);
        }
      });
    });
  });

  finalColors = finalColors.filter(onlyUnique);
  // console.log(finalColors);

  // 2. Find all unique sizes
  let finalSizes = [];

  products.map(product => {
    product.variants.map(variants => {
      // -- Filter Duplicate Colors
      variants.selectedOptions.map(option => {
        if (option.name === "Size") {
          finalSizes.push(option.value);
        }
      });
    });
  });
  finalSizes = finalSizes.filter(onlyUnique);

  // 2. Find all unique feature tags
  let finalFeatureTags = [];

  products.map(product => {
    product.tags.map(tag => {
      if (tag.includes("Features")) {
        finalFeatureTags.push(tag);
      }
    });
  });

  finalFeatureTags = finalFeatureTags.filter(onlyUnique);

  function filterByColor(handlelizedFilterColor, filterFullTitle) {
    setFilterColor(handlelizedFilterColor);
    let filteredProducts = [];
    products.map(product => {
      let filteredProductValues = [];
      product.options.map(option => {
        if (option.name === "Color") {
          option.values.map(value => {
            let handlizedValue = colorHandlizeAndReplaceSimilarColors(value);
            if (handlizedValue === handlelizedFilterColor) {
              filteredProductValues.push(value);
            }
          });
        }
      });

      if (filteredProductValues.length > 0) {
        filteredProducts.push(product);
      }
    });

    setFilteredProducts(filteredProducts);
    setTootipColor(filterFullTitle);
    setCurrentColorTooltip(filterFullTitle);
    setFilterSize("");
    setFilterFeature("");
  }

  function filterBySize(handlelizedFilterSize, colorFilter) {
    let sizeFilteredProducts = [];
    setFilterSize(handlelizedFilterSize);
    setFilterColor(colorFilter);

    let productsToFilter = products;

    productsToFilter.map(product => {
      let filteredProductSizeValues = [];

      // 1. If there is a color filter, check if the product has that first
      if (colorFilter && (colorFilter !== "" || colorFilter !== undefined)) {
        let doesProductHaveColor = false;
        product.options[0].values.map(colorVariant => {
          if (
            colorHandlizeAndReplaceSimilarColors(colorVariant) === colorFilter
          ) {
            doesProductHaveColor = true;
          }
        });
        if (doesProductHaveColor) {
          product.variants.map(variant => {
            let handlizedColor = colorFilter;
            let handlizedFilterSize = handlelizedFilterSize;
            let handlizedVariantColor = colorHandlizeAndReplaceSimilarColors(
              variant.selectedOptions[0].value
            );
            let handlizedVariantSize = colorHandlizeAndReplaceSimilarColors(
              variant.selectedOptions[1].value
            );

            if (
              variant.availableForSale &&
              handlizedVariantColor.includes(handlizedColor) &&
              handlizedVariantSize === handlizedFilterSize
            ) {
              sizeFilteredProducts.push(product);
            }
          });
          setFilteredProducts(sizeFilteredProducts);
        }

        // console.log("triggered", sizeFilteredProducts, filteredProducts);
      } else {
        // 2. No color selected so sort thru the first available variant of collection products
        // console.log(
        //   "no color selectd, so just go thru sizes",
        //   handlelizedFilterSize
        // );

        let sizeFilteredProducts = [];
        collection.products.map(product => {
          // check within variant to see if it's available and has the size

          let sizeFilteredValues = [];
          let initialSizeFilterCondition;
          product.variants.map((variant, index) => {
            // set filter condition so it only checks the first variant color
            // -- check if it has color
            let doesProductHaveColor = variant.selectedOptions[1]
              ? true
              : false;
            if (index === 0 && doesProductHaveColor) {
              initialSizeFilterCondition = variant.selectedOptions[0].value;
            }

            // if it doesn;t have a color

            if (!doesProductHaveColor) {
              let isVariantAvailable = variant.availableForSale;
              let doesVariantHaveSize =
                colorHandlizeAndReplaceSimilarColors(
                  variant.selectedOptions[0].value
                ) === handlelizedFilterSize
                  ? true
                  : false;

              if (isVariantAvailable && doesVariantHaveSize) {
                sizeFilteredValues.push(true);
              }
            } else {
              let isVariantAvailable = variant.availableForSale;
              let doesVariantHaveSize =
                colorHandlizeAndReplaceSimilarColors(
                  variant.selectedOptions[1].value
                ) === handlelizedFilterSize
                  ? true
                  : false;
              let doesVariantColorMatchFirstVariant =
                initialSizeFilterCondition === variant.selectedOptions[0].value
                  ? true
                  : false;

              if (
                isVariantAvailable &&
                doesVariantHaveSize &&
                doesVariantColorMatchFirstVariant
              ) {
                sizeFilteredValues.push(true);
              }
            }
          });
          if (sizeFilteredValues.length > 0) {
            sizeFilteredProducts.push(product);
          }
        });
        setFilteredProducts(sizeFilteredProducts);
      }
    });
    setFilterFeature("");
  }

  function handleTagFilter(tagName) {
    setFilterFeature(tagName);
    // 1. There is a color + size

    let filteredFeatureProducts = [];
    products.map(product => {
      // -- color check
      let doesProductHaveColor = false;
      if (filterColor !== "" && filterColor !== undefined) {
        product.options[0].values.map(colorVariant => {
          if (
            colorHandlizeAndReplaceSimilarColors(colorVariant) === filterColor
          ) {
            doesProductHaveColor = true;
          }
        });
      } else {
        console.log("no color selected yet");
      }

      // -- size check
      let doesProductHaveSize;
      if (filterSize && (filterSize !== "" || filterSize !== undefined)) {
        let initialSizeFilterCondition;

        product.variants.map((variant, index) => {
          if (index === 0 && doesProductHaveColor) {
            initialSizeFilterCondition = variant.selectedOptions[0].value;
          }
          let doesVariantHaveSize = variant.selectedOptions[1]
            ? colorHandlizeAndReplaceSimilarColors(
                variant.selectedOptions[1].value
              ) === filterSize
            : colorHandlizeAndReplaceSimilarColors(
                variant.selectedOptions[0].value
              ) === filterSize;

          let isVariantAvailable = variant.availableForSale;

          let doesVariantColorMatchFirstVariant = doesProductHaveColor
            ? initialSizeFilterCondition === variant.selectedOptions[0].value
            : true;

          if (variant.selectedOptions[1]) {
            if (
              doesVariantHaveSize &&
              doesVariantColorMatchFirstVariant &&
              isVariantAvailable
            ) {
              doesProductHaveSize = true;
            }
          } else {
            if (doesVariantHaveSize && isVariantAvailable) {
              doesProductHaveSize = true;
            }
          }
        });
      }

      // -- tag check
      let doesProductHaveTag = false;
      product.tags.map(tag => {
        if (tag.includes(tagName)) {
          doesProductHaveTag = true;
        }
      });

      // console.log("pre-tag filter check", filterColor, filterSize);

      // Size + Color

      if (
        filterSize !== undefined &&
        filterSize !== "" &&
        filterColor !== undefined &&
        filterColor !== ""
      ) {
        console.log("case 1", doesProductHaveSize, doesProductHaveTag);
        if (doesProductHaveColor && doesProductHaveTag && doesProductHaveSize) {
          filteredFeatureProducts.push(product);
        }
      }

      // Color
      if (filterColor && (filterSize === undefined || filterSize === "")) {
        console.log("case 2");
        if (doesProductHaveColor && doesProductHaveTag) {
          filteredFeatureProducts.push(product);
        }
      }
      // Size
      if (filterSize && (filterColor === undefined || filterColor === "")) {
        console.log("case 3", doesProductHaveSize, doesProductHaveTag);
        if (doesProductHaveSize && doesProductHaveTag) {
          filteredFeatureProducts.push(product);
        }
      }

      // Just the tags
      if (
        (filterSize === undefined || filterSize === "") &&
        (filterColor === undefined || filterColor === "")
      ) {
        console.log("case 4", doesProductHaveSize);
        if (doesProductHaveTag) {
          filteredFeatureProducts.push(product);
        }
      }

      // if (doesProductHaveColor && doesProductHaveTag && doesProductHaveSize) {
      //   console.log("this product is showing", product);
      //   filteredFeatureProducts.push(product);
      // }
    });

    setFilteredProducts(filteredFeatureProducts);
  }

  function handleColorFilterHover(color) {
    setTootipColor(color);
  }

  // this for monitoring the tooltip
  function handleColorFilterReset() {
    console.log(currentColorTooltip, tooltipColor);
    if (currentColorTooltip !== tooltipColor) {
      setTootipColor(currentColorTooltip);
    }
  }

  return (
    <FilterContainer className={toggleMobileFilter ? "active" : ""}>
      <div className="filter-mobile-trigger">
        <button onClick={handleMobileFilterToggle}>
          {toggleMobileFilter ? "Close" : "Filter"}
        </button>
      </div>
      <div className="inner-wrap">
        <div className="scroll-container">
          <div className="current-filter">
            <div className="title-container">
              <h1>{collection.title}</h1>
            </div>
            <div className="inner-wrap">
              <button onClick={handleResetFilters}>Remove All Filters</button>
            </div>
          </div>
          {finalColors.length > 0 && (
            <div className="color-filter-container">
              <h4 className="filter-title">Colors</h4>
              <div className="color-container">
                <ul className="colors" onMouseLeave={handleColorFilterReset}>
                  {finalColors.map(regularCaseColor => {
                    let color = colorHandlize(regularCaseColor);
                    return (
                      <li className={color}>
                        <button
                          onMouseEnter={() =>
                            handleColorFilterHover(regularCaseColor)
                          }
                          onClick={() => filterByColor(color, regularCaseColor)}
                          value={color}
                          className={"color-btn-container " + color}
                        ></button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className={
                  tooltipColor.length > 0
                    ? "tooltip-container active"
                    : "tooltip-container hide"
                }
              >
                <div className="inner-wrap">{tooltipColor}</div>
              </div>
            </div>
          )}

          <div className="size-filter-container">
            <h4 className="filter-title">Sizes</h4>
            <div className="size-container">
              <ul className="sizes">
                {finalSizes.map(regularCaseSize => {
                  let size = colorHandlize(regularCaseSize);
                  return (
                    <li prop={filterSize} className={"size-" + size}>
                      <button
                        // onMouseEnter={() =>
                        //   handleColorFilterHover(regularCaseColor)
                        // }
                        onClick={() => filterBySize(size, filterColor)}
                        value={size}
                        className={
                          filterSize == size
                            ? "size-btn-container active " + size
                            : "size-btn-container " + size
                        }
                      >
                        {regularCaseSize}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="tags-container features">
            <h4 className="filter-title">Features</h4>

            <div className="features-container">
              <ul className="features">
                {finalFeatureTags.map(regularCaseFeature => {
                  let feature = regularCaseFeature.replace("Features_", "");
                  return (
                    <li className={"feature-" + feature}>
                      <button
                        // onMouseEnter={() =>
                        //   handleColorFilterHover(regularCaseColor)
                        // }
                        onClick={() => handleTagFilter(regularCaseFeature)}
                        value={feature}
                        className={
                          filterFeature === regularCaseFeature
                            ? "tag-btn-container active"
                            : "tag-btn-container"
                        }
                      >
                        {feature}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FilterContainer>
  );
};

export default ProductFilter;
