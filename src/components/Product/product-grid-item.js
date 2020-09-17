import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { window } from "browser-monads";

import Img from "gatsby-image";
import { TransitionMixin, media } from "../helpers";
import { StoreContext } from "../../context/StoreContext";

const ProductGridItemContainer = styled.div`
  flex: 1 1 100%;
  margin-bottom: 40px;
  ${media.medium`flex: 0 0 50%;`}
  > .inner-wrap {
    max-width: 400px;
    margin: 0 auto;
  }
  .image-container {
    position: relative;
    max-height: 100%;
    overflow-y: hidden;
    ${media.medium`max-height: 100%;`}
    .image-1 {
      position: absolute !important;
      width: 100%;
      height: 100%;
      top: 0;
      opacity: 0;
      ${TransitionMixin(".25s")}
      &.fade-in {
        opacity: 1;
      }
    }
    &:hover {
      .quick-shop-container {
        .inner-wrap {
          opacity: 1;
        }
      }
    }
    .quick-shop-container {
      position: absolute;
      z-index: 200;
      bottom: 20px;
      left: 0;
      width: 100%;
      text-align: center;
      .inner-wrap {
        background-color: #fff;
        max-width: 300px;
        margin: 0 auto;
        padding: 10px 0;
        border: 1px solid #000;
        border-radius: 4px;
        line-height: 1;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        ${media.medium`opacity: 0;`}
        ${TransitionMixin(".25s")}
        .quick-shop-text, .view-dress {
          font-size: 13px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0px;
          color: #000;
          border: none;
          font-weight: bold;
          -webkit-appearance: none;
          background-color: #fff;
          &.hide {
            display: none;
          }
        }
        ul {
          &.sizes {
            display: none;
            margin: 0px;
            &.show {
              display: block;
            }
          }
          li {
            display: inline-block;
            margin-bottom: 0px;
            margin-right: 5px;
            &:last-child {
              margin-right: 0px;
            }
            button {
              font-size: 11px;
              font-weight: bold;
              border: 1px solid #000;
              padding: 5px 5px 3px;
              background-color: transparent;
              line-height: 1;
              color: #000;
              ${TransitionMixin(".25s")}
              &.disabled {
                opacity: 0.5;
                position: relative;
                &::after {
                  content: " ";
                  border-top: 1px solid #000;
                  transform: rotate(-45deg);
                  position: absolute;
                  width: 100%;
                  right: 0;
                  top: 9px;
                }
                &:hover {
                  opacity: 0.5;
                  cursor: not-allowed;
                  color: #000;
                  background-color: #fff;
                }
              }
              &:hover {
                color: #fff;
                background-color: #000;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .info-container {
    padding: 20px 0 10px;
    > .inner-wrap {
      display: flex;
      .title-container {
        flex: 1.5;
        text-align: left;
        h4 {
          font-size: 13px;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 0px;
        }
        p {
          font-weight: bold;
          font-size: 13px;
          color: #777;
          margin-bottom: 0px;
        }
      }
      .color-container {
        flex: 1;
        .colors {
          text-align: right;
          li {
            position: relative;
            margin-bottom: 0px;
            &:hover {
              .tooltip-container {
                opacity: 1;
              }
            }
            button {
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
              }
              &:focus,
              &:visited {
                transform: scale(1.1);
                outline: 0;
              }
            }
          }
        }
      }
    }
  }
`;

const ProductGridItem = ({ product, filterColor }) => {
  const { addProductToCart, colorHandlize } = useContext(StoreContext);
  // console.log("filter color", filterColor);

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
  // console.log("top log", product);

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
  //   console.log("final", finalColors);

  // Handle Color Change
  const [currentColor, setCurrentColor] = useState([]);

  function updateProductURL(color) {
    setVariantURL(color);
  }

  function handleColorChange(color) {
    // If there are multiple colors, set up the color/size switcher
    if (color) {
      // Set color images
      let imageArray = [];
      let filterCondition = color.replace(/\s+/g, "-").toLowerCase();
      product.images.map(image => {
        let altTextCheck =
          image.altText && image.altText.replace(/\s+/g, "-").toLowerCase();

        if (
          altTextCheck === filterCondition ||
          (altTextCheck && altTextCheck.includes(filterCondition))
        ) {
          imageArray.push(image);
        } else {
          return;
        }
      });

      setCurrentColor(imageArray);

      // Sort sizes
      handleSizesSort(colorHandlize(color));

      updateProductURL(colorHandlize(color));
    } else {
      handleSizesSort();
    }
  }

  const [sizes, setSizes] = useState([]);
  const [variantURL, setVariantURL] = useState("");

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
            }
          });
        });
        // console.log("sizes here", availableSizesArray);
      } else {
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

    // (filterColor !== "" && filterColor !== undefined) || availableSizesArray[0]
    //   ? setHoverColor(availableSizesArray[0].image.altText)
    //   : setHoverColor(product.images[0].altText);

    // console.log("the sizes are", sizes, availableSizesArray.length);
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
    // console.log("filter changed");

    filterColor !== "" && filterColor !== undefined
      ? handleColorChange(filterColor)
      : handleColorChange(product.images[0].altText);

    setHoverColor(
      product.images[0].altText &&
        product.images[0].altText.replace("Betsy", "")
    );

    if (window.innerWidth < 992) {
      setShowQuickShop(true);
    }
  }, [filterColor]);

  function checkTooltipText() {
    // check for glove product
    //

    if (
      currentColor[0] &&
      currentColor[0].altText &&
      !currentColor[0].altText.toLowerCase().includes("left") &&
      hoverColor != currentColor[0].altText
    ) {
      // console.log("current color is", currentColor[0].altText);
      if (currentColor[0].altText.toLowerCase().includes("bw")) {
        setHoverColor("B&W");
      } else if (currentColor[0].altText.toLowerCase().includes("nb")) {
        setHoverColor("N&B");
      } else {
        setHoverColor(currentColor[0].altText);
      }
    } else {
      console.log("baby", hoverColor);
      sizes && currentColor.length > 0
        ? setHoverColor(currentColor[0].altText)
        : hoverColor && setHoverColor(hoverColor);
    }
  }

  let showQuickShopText = true;
  product.tags &&
    product.tags.map(tag => {
      if (tag === "NO-QS") {
        showQuickShopText = false;
      }
    });

  return (
    <ProductGridItemContainer>
      <div className="inner-wrap">
        <div
          className="image-container"
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
        >
          <Link
            to={`/products/${product.handle}${
              variantURL !== ""
                ? "?color=" + variantURL.replace("-betsy", "")
                : ""
            }`}
          >
            {currentColor.length > 0
              ? currentColor.map((image, index) => {
                  // fetchInventoryQuantities();
                  if (index < 2) {
                    // console.log("case x", currentColor);
                    return (
                      <Img
                        key={index}
                        className={`image-${index} ${
                          index == 1 && fadeIn == true ? "fade-in" : ""
                        }`}
                        fluid={image.localFile.childImageSharp.fluid}
                        alt={product.title + " Image " + index + 1}
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
                        key={index}
                        className={`image-${index} ${
                          index == 1 && fadeIn == true ? "fade-in" : ""
                        }`}
                        fluid={image.localFile.childImageSharp.fluid}
                        alt={product.title + " Image " + index + 1}
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
                    sizes.map((size, i) => {
                      let isAvailable = size.availableForSale;
                      let sizeText = size.selectedOptions[1]
                        ? size.selectedOptions[1].value
                        : size.selectedOptions[0].value;

                      return (
                        <li key={i}>
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
          {/* <button onClick={() => addProductToCart(firstVariant.shopifyId)}>
            Add to Cart
          </button> */}
        </div>
      </div>
    </ProductGridItemContainer>
  );
};
export default ProductGridItem;
