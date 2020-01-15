import React, { Component, useState } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { TransitionMixin } from "../helpers";

const ProductGridItemContainer = styled.div`
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
  }
`;

const ProductGridItem = ({ product }) => {
  console.log(product);
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
  console.log("top log", product);

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
    let imageArray = [];
    let filterCondition = color;
    let filteredColors = product.images.map(image => {
      let altTextCheck =
        image.altText && image.altText.replace(/\s+/g, "-").toLowerCase();
      console.log(
        "alt text is ",
        altTextCheck,
        image.altText,
        " filter condition ",
        filterCondition
      );
      if (altTextCheck == filterCondition) {
        imageArray.push(image);
      } else {
        return;
      }
    });

    console.log(filteredColors, "filtered colors");
    setCurrentColor(imageArray);
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
                console.log(image, index);
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
                console.log(image, index);
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
              })}
        </div>
        <div className="info-container">
          <div className="inner-wrap">
            <div className="color-container">
              <ul className="colors">
                {finalColors.map((color, i) => {
                  let colorHandle = color.replace(/\s+/g, "-").toLowerCase();
                  console.log("iii", i);

                  return (
                    <li>
                      <button
                        className={`color-btn-container ${colorHandle}`}
                        onClick={() => handleColorChange(colorHandle)}
                      ></button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProductGridItemContainer>
  );
};
export default ProductGridItem;
