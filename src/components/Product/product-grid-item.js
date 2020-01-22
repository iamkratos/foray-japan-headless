import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

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
    max-height: 420px;
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
        h4 {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0px;
          color: #000;

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

const ProductGridItem = ({ product }) => {
  const { addProductToCart } = useContext(StoreContext);
  console.log(product);

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

  function handleColorChange(color) {
    // If there are multiple colors, set up the color/size switcher
    if (color) {
      // Set color images
      let imageArray = [];
      let filterCondition = color.replace(/\s+/g, "-").toLowerCase();
      product.images.map(image => {
        let altTextCheck =
          image.altText && image.altText.replace(/\s+/g, "-").toLowerCase();

        // console.log(altTextCheck, " ", filterCondition);
        if (altTextCheck === filterCondition) {
          imageArray.push(image);
        } else {
          return;
        }
      });

      // console.log(imageArray, "filtered colors");
      setCurrentColor(imageArray);

      // Sort sizes
      handleSizesSort(color);
    } else {
      handleSizesSort();
    }
  }

  const [sizes, setSizes] = useState([]);

  function handleSizesSort(selectedColor) {
    console.log("selected color is", selectedColor);
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
      console.log("glove properties", gloveOrientation, product);
      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          console.log(
            "compare",
            option.value.toLowerCase().trim(),
            gloveOrientation
          );
          if (option.value.toLowerCase().includes(gloveOrientation)) {
            availableSizesArray.push(variant);
          }
        });
      });
    } else {
      // if product is not a glove, run this
      if (selectedColor) {
        console.log("case a");
        product.variants.map(variant => {
          variant.selectedOptions.map(option => {
            if (option.value.includes(selectedColor)) {
              availableSizesArray.push(variant);
            }
          });
        });
        // console.log("sizes here", availableSizesArray);
      } else {
        console.log("case b");
        product.variants.map(variant => {
          variant.selectedOptions.map(option => {
            availableSizesArray.push(variant);
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

  const [hoverColor, setHoverColor] = useState("none");

  useEffect(() => {
    handleColorChange(product.images[0].altText);
    if (
      product.images[0].altText &&
      product.images[0].altText.toLowerCase().includes("left")
    ) {
      setHoverColor("Left");
    } else {
      setHoverColor(product.images[0].altText);
    }

    if (window.innerWidth < 992) {
      setShowQuickShop(true);
    }
    console.log(window.innerWidth, "window inner width");
  }, []);

  function checkTooltipText() {
    // check for glove product
    if (
      currentColor[0] &&
      !currentColor[0].altText.toLowerCase().includes("left") &&
      hoverColor != currentColor[0].altText
    ) {
      console.log("current color is", currentColor[0].altText);
      setHoverColor(currentColor[0].altText);
    } else {
      console.log("baby", sizes);
      setHoverColor(sizes[0].selectedOptions[0].value);
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
          <Link to={`/products/${product.handle}`}>
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
          </Link>

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
          </div>
        </div>
        <div className="info-container">
          <div className="inner-wrap">
            <div className="title-container">
              <h4>{product.title}</h4>
              <p>${parseFloat(product.priceRange.maxVariantPrice.amount)}</p>
              {console.log(hoverColor, "hover color")}
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

                  console.log("glove color", color);

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
