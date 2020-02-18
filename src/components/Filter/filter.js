import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import styled from "styled-components";

import { TransitionMixin } from "../helpers";

const FilterContainer = styled.div`
  flex: 1;

  .color-container {
    .colors {
      margin-left: -6px;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .current-filter {
    margin-bottom: 20px;
    .title-container {
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
        margin: 0 0 0 -6px;
        padding: 0px;

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
}) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const { colorHandlize, colorHandlizeAndReplaceSimilarColors } = useContext(
    StoreContext
  );

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
  // console.log("legit sizes", finalSizes);

  function filterByColor(handlelizedFilterColor, filterFullTitle) {
    console.log("specs", handlelizedFilterColor);
    setFilterColor(handlelizedFilterColor);
    let filteredProducts = [];
    products.map(product => {
      let filteredProductValues = [];
      product.options.map(option => {
        if (option.name === "Color") {
          option.values.map(value => {
            console.log(value);
            let handlizedValue = colorHandlizeAndReplaceSimilarColors(value);
            console.log("specs", handlizedValue, handlelizedFilterColor);
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
    console.log(
      "the filtered products are",
      filteredProducts,
      filteredProducts.length
    );
    setFilteredProducts(filteredProducts);
    setTootipColor(filterFullTitle);
    setCurrentColorTooltip(filterFullTitle);
    setFilterSize("");
  }

  // TODO: Need to finalize this

  function filterBySize(handlelizedFilterSize, sizeFullTitle, colorFilter) {
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
    <FilterContainer>
      <div className="current-filter">
        <div className="title-container">
          <h1>{collection.title}</h1>
        </div>
        <div className="inner-wrap">
          <button onClick={handleResetFilters}>Remove All Filters</button>
        </div>
      </div>
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
        <div className="tooltip-container">
          <div className="inner-wrap">{tooltipColor}</div>
        </div>
      </div>

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
                    onClick={() =>
                      filterBySize(size, regularCaseSize, filterColor)
                    }
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
    </FilterContainer>
  );
};

export default ProductFilter;
