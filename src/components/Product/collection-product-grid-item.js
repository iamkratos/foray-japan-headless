import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "gatsby";
import { window } from "browser-monads";

import Img from "gatsby-image";

import { StoreContext } from "../../context/StoreContext";

import ProductStyles from "./product-styles";

const ProductGridItem = ({
  product,
  filterColor,
  setFilterColor,
  filteredProducts,
}) => {
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

  const {
    addProductToCart,
    colorHandlize,
    colorHandlizeAndReplaceSimilarColors,
  } = useContext(StoreContext);

  const [variantURL, setVariantURL] = useState("");

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
  const [currentPrice, setCurrentPrice] = useState();
  const [currentCompareAtPrice, setCurrentCompareAtPrice] = useState();

  function sortImagesAltText(color) {
    let imageArray = [];

    if (color) {
      imageArray = [];
      let filterColorCondition = colorHandlize(color);
      // console.log("image filter condition", filterColorCondition);
      product.images.map(image => {
        let altTextCheck = image.altText && colorHandlize(image.altText);

        // console.log(altTextCheck, filterColorCondition);
        if (altTextCheck && altTextCheck === filterColorCondition) {
          imageArray.push(image);
        } else {
          return;
        }
      });
    }

    // setCurrentColor(imageArray);
    setCurrentProductImages(imageArray);
  }

  // updates product url with variant so it's preloaded -- temp until variant names modified
  function updateProductURL(color) {
    setVariantURL(color);
  }

  function handleColorChange(color) {
    // If there are multiple colors, set up the color/size switcher
    if (color) {
      // Set color images
      sortImagesAltText(color);
      // Sort sizes
      handleSizesSort(colorHandlize(color));

      // update url
      updateProductURL(colorHandlize(color));

      // console.log(currentProductImages);
    } else {
      if (product.images[0]) {
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
        // console.log("case a", selectedColor);
        product.variants.map(variant => {
          variant.selectedOptions.map(option => {
            let handlizedColor = colorHandlize(option.value);
            if (handlizedColor.includes(selectedColor)) {
              availableSizesArray.push(variant);
            }
          });
        });
        // console.log("sizes here", availableSizesArray);
      } else {
        // console.log("case b");
        product.variants.map(variant => {
          variant.selectedOptions.map(option => {
            let handlizedColor = colorHandlize(option.value);
            let handlizedAltText =
              product.images[0].altText &&
              colorHandlize(product.images[0].altText);

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

    setSizes(availableSizesArray);

    let formatedColor = selectedColor ? selectedColor.replace(/-/g, " ") : "";
    if (
      (filterColor !== "" && filterColor !== undefined) ||
      availableSizesArray[0]
    ) {
      if (selectedColor === "bw") {
        setHoverColor("B&W");
      } else if (selectedColor === "nb") {
        setHoverColor("N&B");
      } else {
        setHoverColor(formatedColor);
      }
    } else {
      setHoverColor(formatedColor);
    }

    // set price
    setCurrentPrice(availableSizesArray[0].price);
    setCurrentCompareAtPrice(availableSizesArray[0].compareAtPrice);
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
      currentProductImages[0] &&
      currentProductImages[0].altText &&
      !currentProductImages[0].altText.toLowerCase().includes("left") &&
      hoverColor != currentProductImages[0].altText
    ) {
      // console.log("current color is", currentColor[0].altText);
      if (currentProductImages[0].altText.toLowerCase().includes("bw")) {
        setHoverColor("B&W");
      } else if (currentProductImages[0].altText.toLowerCase().includes("nb")) {
        setHoverColor("N&B");
      } else {
        setHoverColor(currentProductImages[0].altText);
      }
    } else {
      // console.log("baby", sizes);
      sizes && setHoverColor(currentProductImages[0].altText);
    }
  }

  function handleColorButtonHover(color) {
    if (color === "BW") {
      setHoverColor("B&W");
    } else if (color === "NB") {
      setHoverColor("N&B");
    } else {
      setHoverColor(color);
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
          <Link
            to={`/products/${product.handle}${
              variantURL !== "" ? "?color=" + variantURL : ""
            }`}
          >
            {currentProductImages.length > 0
              ? currentProductImages.slice(0, 2).map((image, index) => {
                  // handleSizesSort(firstVariant)
                  // console.log("first variant", firstVariant, image);
                  if (
                    index < 2 &&
                    image.localFile &&
                    image.localFile.childImageSharp
                  ) {
                    return (
                      <Img
                        key={index}
                        alt={product.title + " Image " + index}
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
                  if (index < 2 && image.localFile) {
                    return (
                      <Img
                        key={index}
                        alt={product.title + " Image " + index}
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
                  {sizes.length > 0 &&
                    // console.log("updated sizes", sizes) &&
                    sizes.map((size, index) => {
                      let isAvailable = size.availableForSale;
                      let sizeText = size.selectedOptions[1]
                        ? size.selectedOptions[1].value
                        : size.selectedOptions[0].value;

                      return (
                        <li key={index}>
                          <button
                            disabled={!isAvailable}
                            className={isAvailable ? "" : "disabled "}
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
                <Link
                  className="view-dress"
                  to={`/products/${product.handle}${
                    variantURL !== "" ? "?color=" + variantURL : ""
                  }`}
                >
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
              <p>
                {currentCompareAtPrice ? (
                  <span>${currentCompareAtPrice}</span>
                ) : (
                  ``
                )}{" "}
                ${parseFloat(currentPrice)}
              </p>
              {hoverColor !== undefined && hoverColor.length > 0 ? (
                <div className="tooltip-container">
                  <div className="inner-wrap">{hoverColor}</div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="color-container">
              <ul className="colors" onMouseLeave={checkTooltipText}>
                {finalColors.map((color, i) => {
                  let colorHandle = color
                    .replace(/\s+/g, "-")
                    .replace(/\{/g, "")
                    .replace(/\//g, "-")
                    .replace("&", "")
                    .toLowerCase();

                  // console.log("glove color", color);

                  return (
                    <li key={i}>
                      <button
                        className={`color-btn-container ${colorHandle}`}
                        onClick={() => handleColorChange(color)}
                        onMouseEnter={() => handleColorButtonHover(color)}
                      ></button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProductStyles>
  );
};
export default ProductGridItem;
