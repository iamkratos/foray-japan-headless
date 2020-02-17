import React, { useContext, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import Img from "gatsby-image";

import { StoreContext } from "../../context/StoreContext";

import ProductStyles from "./product-styles";

const ProductGridItem = ({
  product,
  filterColor,
  setFilterColor,
  filteredProducts,
}) => {
  const {
    addProductToCart,
    colorHandlize,
    colorHandlizeAndReplaceSimilarColors,
  } = useContext(StoreContext);

  // Hover Over Effect
  const [fadeIn, setFadeIn] = useState(false);

  function handleHoverIn(e) {
    setFadeIn(true);
  }
  function handleHoverOut(e) {
    setFadeIn(false);
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  //  Filter Color Buttons

  let finalColors = [];
  product.variants.map(variants => {
    // -- Filter Duplicate Colors
    variants.selectedOptions.map(option => {
      if (option.name === "Color") {
        finalColors.push(option.value);
      }
    });
  });

  finalColors = finalColors.filter(onlyUnique);

  // Handle Color Change
  const [currentProductImages, setCurrentProductImages] = useState([]);

  function sortImagesAltText(color) {
    console.log("fendi", color);
    let imageArray = [];

    if (color) {
      imageArray = [];
      let filterColorCondition = color.replace(/\s+/g, "-").toLowerCase();
      product.images.map(image => {
        let altTextCheck =
          image.altText && image.altText.replace(/\s+/g, "-").toLowerCase();

        console.log(
          "filter condition",
          altTextCheck,
          filterColorCondition,
          altTextCheck && altTextCheck.includes(filterColorCondition)
        );
        if (altTextCheck && altTextCheck.includes(filterColorCondition)) {
          imageArray.push(image);
        } else {
        }
      });
    }

    // setCurrentColor(imageArray);
    setCurrentProductImages(imageArray);
  }
  console.log("image array here", currentProductImages);

  function handleColorChange(color) {
    // If there are multiple colors, set up the color/size switcher
    if (color) {
      // Set color images
      sortImagesAltText(color);
      // Sort sizes
      handleSizesSort(colorHandlize(color));
      console.log("color sort 1", color, filterColor);
    } else {
      console.log("color sort 2", product, currentProductImages);
      if (product.images[0]) {
        product.images[0].altText &&
          console.log(
            "color sort 2.5",
            colorHandlizeAndReplaceSimilarColors(product.images[0].altText)
          );

        // Variant-less products don't have alt text
        if (product.images[0].altText) {
          const oldColor =
            product.images[0].altText &&
            colorHandlizeAndReplaceSimilarColors(product.images[0].altText);

          // Set color images
          sortImagesAltText(oldColor);
          // Sort sizes
          handleSizesSort(colorHandlize(oldColor));
        } else {
          console.log("color sort 3");
          sortImagesAltText();
          handleSizesSort();
        }
      }
    }
  }

  const [sizes, setSizes] = useState([]);

  function handleSizesSort(selectedColor) {
    // console.log("selected color is", selectedColor);
    let availableSizesArray = [];

    // Check if product is a glove
    if (
      selectedColor &&
      (selectedColor
        .toLowerCase()
        .trim()
        .includes("left") ||
        selectedColor
          .toLowerCase()
          .trim()
          .includes("right"))
    ) {
      let gloveOrientation = selectedColor
        .toLowerCase()
        .trim()
        .includes("left")
        ? "left"
        : "right";

      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          if (option.value.toLowerCase().includes(gloveOrientation)) {
            availableSizesArray.push(variant);
          }
        });
      });
    } else {
      // if product is not a glove, run this
      if (selectedColor) {
        // console.log("case a");
        product.variants.map(variant => {
          variant.selectedOptions.map(option => {
            let handlizedColor = colorHandlize(option.value);
            if (handlizedColor.includes(selectedColor)) {
              availableSizesArray.push(variant);
              console.log("one side", selectedColor, handlizedColor);
            }
          });
        });
        // console.log("sizes here", availableSizesArray);
      } else {
        console.log("case b");
        product.variants.map(variant => {
          variant.selectedOptions.map(option => {
            let handlizedColor = colorHandlize(option.value);
            let handlizedAltText =
              product.images[0].altText &&
              colorHandlize(product.images[0].altText);
            console.log(
              "log",
              product.images[0].altText,
              handlizedColor,
              handlizedAltText
            );
            if (handlizedAltText === handlizedColor) {
              availableSizesArray.push(variant);
            }
          });
        });
      }

      // fallback: if there aren't any sizes found, load them all
      if (availableSizesArray.length < 1) {
        product.variants.map(variant => {
          variant.selectedOptions.map(option => {
            availableSizesArray.push(variant);
          });
        });
      }
    }

    // setHoverColor(
    //   availableSizesArray[0] &&
    //     availableSizesArray[0].images[0] &&
    //     availableSizesArray[0].images[0].altText
    // );

    console.log("presy", filterColor, availableSizesArray);
    setSizes(availableSizesArray);

    filterColor !== "" && filterColor !== undefined
      ? setHoverColor(availableSizesArray[0].image.altText)
      : setHoverColor(product.images[0].altText);

    // console.log("the sizes are", sizes, availableSizesArray.length);
  }

  // Quick Shop Hover Over
  const [showQuickShop, setShowQuickShop] = useState(true);

  function handleQuickShopHoverIn(e) {
    // console.log("hover in");
    setShowQuickShop(false);
  }

  function handleQuickShopHoverOut(e) {
    setShowQuickShop(true);
  }

  // -- Hover Color Show Tooltip

  const [hoverColor, setHoverColor] = useState("none");

  useEffect(() => {
    console.log("use effect running", filterColor);

    // Define whether quick shop should show
    if (window.innerWidth < 992) {
      setShowQuickShop(true);
    }
    // console.log("current color", currentColor, filterColor);
    handleColorChange(filterColor);
  }, [filteredProducts]);

  function checkTooltipText() {
    // check for glove product
    if (
      currentProductImages[0].altText &&
      !currentProductImages[0].altText.toLowerCase().includes("left") &&
      hoverColor != currentProductImages[0].altText
    ) {
      // console.log("current color is", currentColor[0].altText);
      setHoverColor(currentProductImages[0].altText);
    } else {
      // console.log("baby", sizes);
      sizes && setHoverColor(sizes[0].selectedOptions[0].value);
    }
  }

  let showQuickShopText = true;
  product.tags &&
    product.tags.map(tag => {
      if (tag == "NO-QS") {
        showQuickShopText = false;
      }
    });

  return (
    <ProductStyles>
      <div className="inner-wrap">
        <div
          className="image-container"
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
        >
          <Link to={`/products/${product.handle}`}>
            {currentProductImages.length > 0
              ? currentProductImages.slice(0, 2).map((image, index) => {
                  // handleSizesSort(firstVariant)
                  // console.log("first variant", firstVariant, image);
                  if (index < 2) {
                    return (
                      <Img
                        className={`image-${index} ${
                          index == 1 && fadeIn == true ? "fade-in" : ""
                        }`}
                        fluid={image.localFile.childImageSharp.fluid}
                      />
                    );
                  }
                })
              : product.images.slice(0, 2).map((image, index) => {
                  // handleSizesSort(firstVariant)
                  // console.log("first variant", firstVariant, image);
                  if (index < 2) {
                    return (
                      <Img
                        className={`image-${index} ${
                          index == 1 && fadeIn == true ? "fade-in" : ""
                        }`}
                        fluid={image.localFile.childImageSharp.fluid}
                      />
                    );
                  }
                })}
          </Link>

          {/* Sizes Logic */}
          <div className="quick-shop-container">
            {console.log("sizes here", sizes)}
            {showQuickShopText === true ? (
              <div
                className="inner-wrap"
                onMouseEnter={handleQuickShopHoverIn}
                onMouseLeave={handleQuickShopHoverOut}
              >
                <button
                  onClick={handleQuickShopHoverIn}
                  className={
                    showQuickShop == true
                      ? "quick-shop-text"
                      : "hide quick-shop-text"
                  }
                >
                  Quick Shop
                </button>
                <ul className={showQuickShop == true ? "sizes" : "sizes show"}>
                  {console.log("here are the sizes pre-map", sizes)}
                  {sizes.length > 0 &&
                    // console.log("updated sizes", sizes) &&
                    sizes.map(size => {
                      let isAvailable = size.availableForSale;
                      let sizeText = size.selectedOptions[1]
                        ? size.selectedOptions[1].value
                        : size.selectedOptions[0].value;

                      return (
                        <li>
                          <button
                            disabled={!isAvailable}
                            class={isAvailable ? "" : "disabled "}
                            onClick={() => addProductToCart(size.shopifyId)}
                          >
                            {sizeText}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : (
              <div className="inner-wrap">
                <Link className="view-dress" to={`/products/${product.handle}`}>
                  View Product
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="info-container">
          <div className="inner-wrap">
            <div className="title-container">
              <h4>{product.title}</h4>
              <p>${parseFloat(product.priceRange.maxVariantPrice.amount)}</p>
              {hoverColor !== null ? (
                <div className="tooltip-container">
                  <div className="inner-wrap">{hoverColor}</div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="color-container">
              <ul class="colors" onMouseLeave={checkTooltipText}>
                {finalColors.map((color, i) => {
                  let colorHandle = color
                    .replace(/\s+/g, "-")
                    .replace(/\{/g, "")
                    .replace(/\//g, "-")
                    .replace("&", "")
                    .toLowerCase();

                  // console.log("glove color", color);

                  return (
                    <li>
                      <button
                        className={`color-btn-container ${colorHandle}`}
                        onClick={() => handleColorChange(color)}
                        onMouseEnter={() => setHoverColor(color)}
                      ></button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* <button onClick={() => addProductToCart(firstVariant.shopifyId)}>
            Add to Cart
          </button> */}
        </div>
      </div>
    </ProductStyles>
  );
};
export default ProductGridItem;
