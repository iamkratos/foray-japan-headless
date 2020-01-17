import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import Img from "gatsby-image";
import { TransitionMixin } from "../helpers";
import { StoreContext } from "../../context/StoreContext";

const ProductGridItemContainer = styled.div`
  flex: 0 0 50%;
  margin-bottom: 40px;
  > .inner-wrap {
    max-width: 400px;
    margin: 0 auto;
  }
  .image-container {
    position: relative;

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
        opacity: 0;
        ${TransitionMixin(".25s")}
        h4 {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0px;

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
              line-height: 1;
              color: #000;
              ${TransitionMixin(".25s")}

              &.disabled {
                opacity: 0.5;
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
        .tooltip-container {
          background-color: #3b444b;
          color: #fff;
          display: inline-block;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 11px;
          line-height: 1;
          padding: 5px 4px 3px;
          white-space: nowrap;
          z-index: 10;
          border-radius: 2px;
          letter-spacing: 0.7px;
          ${TransitionMixin(".25s")}
        }
      }
      .color-container {
        flex: 1;

        .colors {
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

const ProductGridItem = ({ product }) => {
  const { isCartOpen, addProductToCart } = useContext(StoreContext);
  console.log(product);

  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product;

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
      if (option.name == "Color") {
        finalColors.push(option.value);
      }
    });
  });

  finalColors = finalColors.filter(onlyUnique);
  //   console.log("final", finalColors);

  // Handle Color Change
  const [currentColor, setCurrentColor] = useState([]);

  function handleColorChange(color) {
    // If there are multiple colors, set up the color/size switcher
    if (color) {
      // Set color images
      let imageArray = [];
      let filterCondition = color.replace(/\s+/g, "-").toLowerCase();
      let filteredColors = product.images.map(image => {
        let altTextCheck =
          image.altText && image.altText.replace(/\s+/g, "-").toLowerCase();

        console.log(altTextCheck, " ", filterCondition);
        if (altTextCheck == filterCondition) {
          imageArray.push(image);
        } else {
          return;
        }
      });

      // console.log(imageArray, "filtered colors");
      setCurrentColor(imageArray);

      // Find available sizes based on color and
      // console.log("current color", color, filterCondition);
      if (currentColor.length > 0) {
        let selectedColor = currentColor[0].altText;
        // console.log("product here", selectedColor);
      }

      // Sort sizes
      handleSizesSort(color);
    } else {
      handleSizesSort();
    }
  }

  const [sizes, setSizes] = useState([]);

  function handleSizesSort(selectedColor) {
    let availableSizesArray = [];
    if (selectedColor) {
      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          if (option.value.includes(selectedColor)) {
            availableSizesArray.push(variant);
          }
        });
      });
      // console.log("sizes here", availableSizesArray);
    } else {
      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          availableSizesArray.push(variant);
        });
      });
    }
    setSizes(availableSizesArray);

    // console.log("the sizes are", sizes, availableSizesArray.length);
  }

  // Quick Shop Hover Over
  const [showQuickShop, setShowQuickShop] = useState(true);

  function handleQuickShopHoverIn(e) {
    console.log("hover in");
    setShowQuickShop(false);
  }
  function handleQuickShopHoverOut(e) {
    setShowQuickShop(true);
  }

  // -- Hover Color Show Tooltip

  const [hoverColor, setHoverColor] = useState("");

  useEffect(() => {
    handleColorChange(product.images[0].altText);
    setHoverColor(product.images[0].altText);
  }, []);

  function checkTooltipText() {
    if (hoverColor != currentColor[0].altText) {
      setHoverColor(currentColor[0].altText);
    }
  }

  return (
    <ProductGridItemContainer>
      <div className="inner-wrap">
        <div
          className="image-container"
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
        >
          {currentColor.length > 0
            ? currentColor.map((image, index) => {
                // fetchInventoryQuantities();
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

          {/* Sizes Logic */}
          <div className="quick-shop-container">
            {/* {console.log(sizes)} */}
            <div
              className="inner-wrap"
              onMouseEnter={handleQuickShopHoverIn}
              onMouseLeave={handleQuickShopHoverOut}
            >
              <h4 className={showQuickShop == true ? "" : "hide"}>
                Quick Shop
              </h4>
              <ul className={showQuickShop == true ? "sizes" : "sizes show"}>
                {sizes.length > 0 &&
                  sizes.map(size => {
                    let isAvailable = size.availableForSale;
                    let sizeText = size.selectedOptions[1]
                      ? size.selectedOptions[1].value
                      : size.selectedOptions[0].value;

                    return (
                      <li>
                        <button
                          disabled={!isAvailable}
                          class={isAvailable ? "" : "disabled"}
                          onClick={() => addProductToCart(size.shopifyId)}
                        >
                          {sizeText}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="info-container">
          <div className="inner-wrap">
            <div className="title-container">
              <h4>{product.title}</h4>
              <p>${product.priceRange.maxVariantPrice.amount}</p>
              <div className="tooltip-container">
                <div className="inner-wrap">{hoverColor}</div>
              </div>
            </div>
            <div className="color-container">
              <ul class="colors" onMouseLeave={checkTooltipText}>
                {finalColors.map((color, i) => {
                  let colorHandle = color
                    .replace(/\s+/g, "-")
                    .replace("&", "")
                    .toLowerCase();

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
    </ProductGridItemContainer>
  );
};
export default ProductGridItem;
