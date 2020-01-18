import React, { useEffect, useState, useContext, useRef } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import { StoreContext } from "../context/StoreContext";
import Wrapper from "../components/org/Wrapper";
import Layout from "../components/layout";
import styled from "styled-components";
import { TransitionMixin } from "../components/helpers";

const ProductPageContainer = styled.section`
  padding: 40px 0;

  .product-images-container {
    display: flex;
    flex: 1;

    .thumbnail-container {
      flex: 0.5;

      > .inner-wrap {
        max-width: 120px;
        max-height: 450px;
        overflow-y: scroll;
        margin-bottom: 0px;
        margin: 0 auto;

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar {
          width: 5px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #000000;
          /* border: 2px solid #555555; */
        }

        .gatsby-image-wrapper {
          margin-bottom: 30px;
          max-width: 100px;
        }

        button {
          width: 100%;
          border: none;
          background-color: transparent;

          &:active,
          &:focus {
            outline: 0;
          }
        }
      }
    }

    .main-photo-container {
      flex: 2;
      .inner-wrap {
        .gatsby-image-wrapper {
          max-width: 400px;
          margin: 0 auto;
        }
      }
    }
  }
  .product-info-wrapper {
    flex: 1;

    > .inner-wrap {
      max-width: 80%;
      margin: 0 auto;
      padding-top: 3%;
      h1 {
        color: #000;
        font-size: 24px;
        margin: 0 0 10px;
        line-height: 1.5;
      }
      p {
        /* font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
          Helvetica Neue, sans-serif; */
        color: #4a4a4a;
        font-size: 14px;
        margin: 0 0 10px;
        font-weight: 400;
        line-height: 1.5;
        &:last-child {
          margin-bottom: 0px;
        }

        &.price {
          font-weight: bold;
          color: #777;
          font-size: 17px;
          border-top: 1px solid #efefef;
          border-bottom: 1px solid #efefef;
          padding: 15px 0;
          line-height: 1;
        }
      }

      strong {
        color: #4a4a4a;
        font-size: 14px;
      }

      .description-container {
        padding: 15px 0;
      }

      .variant-selector-container {
        &.color-container {
          margin-top: 20px;
          margin-bottom: 40px;
          h4 {
            text-transform: uppercase;
            font-weight: bold;
            color: #000;
            letter-spacing: 1px;
            font-size: 14px;
            margin-bottom: 10px;
          }

          ul {
            &.colors {
              text-align: left;

              li {
                margin-bottom: 0px;

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
        &.sizes {
          margin-top: 20px;
          h4 {
            text-transform: uppercase;
            font-weight: bold;
            color: #000;
            letter-spacing: 1px;
            font-size: 14px;
            margin-bottom: 10px;
          }

          ul {
            margin: 0px;
            padding: 0px;
            li {
              display: inline-block;
              margin-right: 10px;
              &:last-child {
                margin-right: 0px;
              }

              button {
                border: 1px solid #ccc;
                color: #000;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 12px;
                line-height: 1;
                padding: 8px 10px;
                margin: 0;
                ${TransitionMixin(".25s")}
                &.active {
                  border-color: #000;
                }
                &:focus,
                &:active {
                  outline: 0;
                }
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
                  border-color: #000;
                }
              }
            }
          }
        }
      }
      .add-to-cart-container {
        margin-top: 40px;
        .inner-wrap {
          button {
            background-color: #000;
            color: #fff;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 14px;
            letter-spacing: 1px;
            padding: 15px 0;
            max-width: 400px;
            width: 100%;
            display: inline-block;
            line-height: 1;
            border: 1px solid #000;
            ${TransitionMixin(".25s")}
            &:hover {
              background-color: #fff;
              color: #000;
            }
          }
        }
      }
    }
  }
`;

const ProductPage = ({ data }) => {
  let product = data.allShopifyProduct.edges[0].node;
  const { addProductToCart } = useContext(StoreContext);
  // console.log(product);
  function createMarkup() {
    return { __html: product.descriptionHtml };
  }

  const [currentImageSet, setCurrentImageSet] = useState([]);
  const [currentSizeSet, setCurrentSizeSet] = useState([]);
  const [sizeId, setSizeId] = useState();
  const [userSize, setUserSize] = useState();
  const scrollContainer = useRef(null);

  function handleVariantChange(color) {
    // 1. Sort Variant Images
    let newImageArray = [];
    product.images.map(image => {
      if (image.altText == color) {
        newImageArray.push(image);
      }
    });
    setCurrentImageSet(newImageArray);
    // 2. Sort Sizes and Check That They're Available
    let newSizesArray = [];
    if (color != null) {
      console.log("case A", color);
      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          console.log(option.value);
          if (option.value == color) {
            console.log("psuhing");
            newSizesArray.push(variant);
          }
        });
      });
      console.log("new sizes", newSizesArray);
      if (newSizesArray.length === 0) {
        console.log("this is happening");
        product.variants.map(variant => {
          newSizesArray.push(variant);
        });
      }
    } else {
      console.log("case B");
      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          newSizesArray.push(variant);
        });
      });
    }
    console.log(newSizesArray);
    setCurrentSizeSet(newSizesArray);
    // 3. Set Image Index To First Image and scroll up
    setMainImageIndex(0);
    scrollContainer.current.scrollTop = 0;
    // 4. Select old size variant

    if (userSize != null) {
      // console.log("there is a size ", userSize, newSizesArray);

      // -- loop thru existing sizes select
      newSizesArray.map(variant => {
        let isVariantAvailable = variant.availableForSale;
        variant.selectedOptions.map(option => {
          if (option.value == userSize) {
            console.log("variant avail", isVariantAvailable);
            if (isVariantAvailable) {
              setSizeId(variant.shopifyId);
            } else {
              for (let i = 0; i < newSizesArray.length; i++) {
                if (newSizesArray[i].availableForSale == true) {
                  setSizeId(newSizesArray[i].shopifyId);
                  break;
                }
              }
            }
          }
        });
      });
    } else {
      console.log("there is not a size ", userSize);
      for (let i = 0; i < newSizesArray.length; i++) {
        if (newSizesArray[i].availableForSale == true) {
          setSizeId(newSizesArray[i].shopifyId);
          break;
        }
      }
      // setSizeId(newSizesArray[0] ? newSizesArray[0].shopifyId : "");
    }
  }

  // Color Organizer

  // -- sort colors, eliminated duplicates
  let finalColors = [];
  product.variants.map(variants => {
    // -- Filter Duplicate Colors
    variants.selectedOptions.map(option => {
      if (option.name == "Color") {
        finalColors.push(option.value);
      }
    });
  });

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const [hoverColor, setHoverColor] = useState("none");

  // const [colorVariants, setColorVariants] = useState();

  function checkTooltipText() {
    if (currentImageSet[0] && hoverColor != currentImageSet[0].altText) {
      setHoverColor(currentImageSet[0].altText);
    }
  }

  useEffect(() => {
    handleVariantChange(product.images[0].altText);
    setHoverColor(product.images[0].altText);

    // Loop through all variants to check if they're avail
    for (let i = 0; i < product.variants.length; i++) {
      if (product.variants[i].availableForSale == true) {
        setSizeId(product.variants[i].shopifyId);
        break;
      }
    }
    // setSize(product.variants[0] ? product.variants[0].shopifyId : "");
    console.log("current size", currentSizeSet);
  }, []);

  finalColors = finalColors.filter(onlyUnique);

  // Size change
  function handleSizeChange(size) {
    let sizeText = size.selectedOptions[1]
      ? size.selectedOptions[1].value
      : size.selectedOptions[0].value;
    setSizeId(size.shopifyId);
    setUserSize(sizeText);
  }

  // Thumbnail behavior
  const [mainImageIndex, setMainImageIndex] = useState();
  function swapMainImage(index) {
    setMainImageIndex(index);
    console.log(index);
  }

  return (
    <Layout>
      <ProductPageContainer>
        <Wrapper flex>
          <div className="product-images-container">
            <div className="thumbnail-container">
              <div className="inner-wrap" ref={scrollContainer}>
                {currentImageSet.map((image, index) => {
                  return (
                    <button onClick={() => swapMainImage(index)}>
                      <Img fluid={image.localFile.childImageSharp.fluid} />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="main-photo-container">
              <div className="inner-wrap">
                {mainImageIndex == null
                  ? currentImageSet.slice(0, 1).map(image => {
                      return (
                        <Img fluid={image.localFile.childImageSharp.fluid} />
                      );
                    })
                  : currentImageSet
                      .slice(mainImageIndex, mainImageIndex + 1)
                      .map(image => {
                        return (
                          <Img fluid={image.localFile.childImageSharp.fluid} />
                        );
                      })}
              </div>
            </div>
          </div>
          <div className="product-info-wrapper">
            <div className="inner-wrap">
              <h1>{product.title}</h1>
              <p className="price">
                ${product.priceRange.maxVariantPrice.amount}
              </p>
              <div
                className="description-container"
                dangerouslySetInnerHTML={createMarkup()}
              />

              {finalColors.length > 0 && (
                <div className="variant-selector-container color-container">
                  <h4>Select Color</h4>
                  <ul class="colors" onMouseLeave={checkTooltipText}>
                    {finalColors.map((color, i) => {
                      let colorHandle = color
                        .replace(/\s+/g, "-")
                        .replace(/\{/g, "")
                        .replace(/\//g, "-")
                        .replace("&", "")
                        .toLowerCase();

                      return (
                        <li>
                          <button
                            onMouseEnter={() => setHoverColor(color)}
                            onClick={() => handleVariantChange(color)}
                            className={`color-btn-container ${colorHandle}`}
                          ></button>
                        </li>
                      );
                    })}
                  </ul>
                  {hoverColor !== null ? (
                    <div className="tooltip-container">
                      <div className="inner-wrap">{hoverColor}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}

              {currentSizeSet.length > 0 && (
                <div className="variant-selector-container sizes">
                  <h4>Select Size</h4>
                  <ul>
                    {currentSizeSet.length > 0 &&
                      currentSizeSet.map(size => {
                        let isAvailable = size.availableForSale;
                        let sizeText = size.selectedOptions[1]
                          ? size.selectedOptions[1].value
                          : size.selectedOptions[0].value;
                        return (
                          <li>
                            <button
                              disabled={!isAvailable}
                              className={
                                (isAvailable ? "" : "disabled ") +
                                (isAvailable && size.shopifyId == sizeId
                                  ? "active"
                                  : "")
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
              )}

              <div className="add-to-cart-container">
                <div className="inner-wrap">
                  <button onClick={() => addProductToCart(sizeId)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </ProductPageContainer>
    </Layout>
  );
};

export const query = graphql`
  query($handle: String!) {
    allShopifyProduct(filter: { handle: { eq: $handle } }) {
      edges {
        node {
          id
          handle
          title
          tags
          images {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          descriptionHtml
          variants {
            availableForSale
            id
            shopifyId
            image {
              originalSrc
            }
            price
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export default ProductPage;
