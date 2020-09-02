import React, { useEffect, useState, useContext, useRef } from "react";
import { graphql, navigate, Link } from "gatsby";
import Img from "gatsby-image";
import { window } from "browser-monads";
import styled from "styled-components";

import Wrapper from "../components/org/Wrapper";
import SEO from "../components/seo";
import Layout from "../components/layout";
import { TransitionMixin, media } from "../components/helpers";
import AddonProduct from "../components/Product/addon-product";
import AddToCart from "../components/Product/add-to-cart";
import RelatedSelling from "../components/Product/related-selling";
import ProductReviews from "../components/Product/product-reviews";
import DogEmbroidery from "../components/Product/dog-emboridery";

import { StoreContext } from "../context/StoreContext";
import X from "../images/x.inline.svg";

const EmbroideryProductPageContainer = styled.section`
  padding: 20px 0 40px;
  ${media.medium`order: 1;padding: 40px 0 40px;`}

  .single-product-grid {
    display: block;

    ${media.medium`display: flex;`}
  }

  .product-images-container {
    display: flex;
    flex: 1;

    .thumbnail-container {
      flex: 0.5;
      order: 2;
      ${media.medium`order: 1;`}

      > .inner-wrap {
        max-width: 120px;
        max-height: 370px;
        overflow-y: scroll;
        margin-bottom: 0px;
        margin: 0 auto;
        ${media.medium`max-height: 450px;`}

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

      .mobile-only {
        margin-top: 20px;
        text-align: center;
        ${media.medium`display: none;`}

        .colors {
          text-align: center;
        }
      }
    }

    .main-photo-container {
      flex: 2;
      order: 1;
      ${media.medium`order: 2;`}
      .inner-wrap {
        .gatsby-image-wrapper {
          max-width: 400px;
          margin: 0 auto;
          ${media.xl`max-width: 500px;`}
        }
      }
    }
  }
  .product-info-wrapper {
    flex: 1;

    > .inner-wrap {
      max-width: 100%;
      margin: 0 auto;
      padding-top: 5%;

      display: flex;
      flex-wrap: wrap;
      ${media.medium`max-width: 80%; display: block; padding-top: 3%;`}
      > * {
        flex: 1 1 100%;
      }

      .title-container {
        order: 1;
        flex: 1 1 100%;
        margin-bottom: 10px;

        ${media.medium`flex: 1 1 50%;margin-bottom: 0px;`}
        h1 {
          color: #000;
          margin: 0 0 10px;
          line-height: 1.5;
          text-transform: uppercase;
          font-size: 16px;
        }
        p {
          /* font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
          Helvetica Neue, sans-serif; */
          color: #4a4a4a;
          font-size: 14px;
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
          &:last-child {
            margin-bottom: 0px;
          }

          &.price {
            font-weight: bold;
            color: #848484;
            font-size: 15px;
            letter-spacing: 0.7px;
            line-height: 1;

            ${media.medium`font-size: 17px;`}

            span {
              opacity: 0.5;
              position: relative;
              margin-right: 7px;
              &::after {
                content: " ";
                position: absolute;
                top: 6px;
                left: 0;
                width: 100%;
                background: #777;
                height: 1px;
              }
            }
          }
        }
        .price-container {
          display: flex;
          align-items: center;
          ${media.medium`border-top: 1px solid #efefef;border-bottom: 1px solid #efefef;padding: 15px 0;`}
          p {
            flex: 1;
          }
          .btn-container {
            a {
              background-color: #fff;
              border: 1px solid #ccc;
              text-transform: uppercase;
              font-weight: bold;
              font-size: 11px;
              letter-spacing: 1px;
              min-width: 100px;
              text-decoration: none;
              border-radius: 54px;
              line-height: 1;
              padding: 7px 9px;
              color: #777;
            }
          }
        }
      }

      strong {
        color: #4a4a4a;
        font-size: 14px;
      }

      .description-container {
        padding: 15px 0 5px;
        color: #4a4a4a;
        font-size: 14px;
        margin: 0;
        font-weight: 400;
        line-height: 1.5;
        order: 3;
        ${media.medium`padding: 15px 0;`}

        p {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0px;
          }
        }

        b {
          display: block;
        }

        br {
          display: none;
        }
      }

      .variant-selector-container {
        &.color-container {
          order: 2;
          flex: 1 1 50%;
          text-align: right;
          ${media.medium`display: block;margin-top: 20px; margin-bottom: 40px; text-align: left;`}
          h4 {
            text-transform: uppercase;
            font-weight: bold;
            color: #4a4a4a;
            letter-spacing: 1px;
            font-size: 12px;
            margin-bottom: 10px;
            display: none;
            ${media.medium`display: block;`}
          }

          .inner-wrap {
            text-align: left;
          }

          ul {
            &.colors {
              text-align: left;
              margin-left: -5px;
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
          order: 2;
          margin-top: 30px;
          ${media.medium`margin-top: 20px;`}
          h4 {
            text-transform: uppercase;
            font-weight: bold;
            color: #4a4a4a;
            letter-spacing: 1px;
            font-size: 12px;
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
                background-color: transparent;
                position: relative;
                ${TransitionMixin(".25s")}
                &.active {
                  border-color: #000;
                }
                &:focus,
                &:active {
                  outline: 0;
                }
                &.disabled,
                &:disabled {
                  opacity: 0.5;
                  position: relative;
                  &::after {
                    content: " ";
                    border-top: 1px solid #777;

                    transform: rotate(138deg);
                    position: absolute;
                    width: 80%;
                    left: 11%;
                    right: 70%;
                    top: 13px;
                  }
                  svg {
                    display: none;
                  }
                  &:hover {
                    opacity: 0.5;
                    cursor: not-allowed;
                    color: #000;
                    background-color: #fff;
                    border-color: #ccc;
                  }
                }

                &:hover {
                  border-color: #000;
                }

                svg {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  right: 0;
                  top: 0;
                  stroke-width: 1px;
                  display: none;
                  stroke: #999;

                  line {
                    &:nth-child(2) {
                      display: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .add-to-cart-container {
        margin-top: 20px;
        ${media.medium`margin-top: 40px;`}
        order: 6;
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

            &.disabled {
              opacity: 0.5;

              &:hover {
                cursor: not-allowed;
                background-color: #000;
                color: #fff;
              }
            }
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

const EmbroideryProductPage = ({ data }) => {
  let product = data.allShopifyProduct.edges[0].node;
  // console.log(product);

  // console.log(data);
  function createMarkup() {
    return { __html: product.descriptionHtml };
  }

  const [currentImageSet, setCurrentImageSet] = useState([]);
  const [currentSizeSet, setCurrentSizeSet] = useState([]);
  const [sizeId, setSizeId] = useState();
  const [userSize, setUserSize] = useState();
  const [availableSizes, setAvailableSizes] = useState(0);
  const [currentPrice, setCurrentPrice] = useState();
  const [compareAtPrice, setCompareAtPrice] = useState();
  const [currentColor, setCurrentColor] = useState("");

  const scrollContainer = useRef(null);
  const [isThereAnAddonProduct, setAnAddonProduct] = useState(false);

  const { reverseColorHandlize, colorHandlize } = useContext(StoreContext);

  // embroidery
  const [emDesign, setEmDesign] = useState("Betsy");

  function handleVariantChange(color, dogName) {
    // 1. Sort Variant Images
    let newImageArray = [];

    let dog = dogName !== undefined ? dogName : emDesign;
    // let dog = dogName

    if (color != null || currentColor !== "") {
      product.images.map(image => {
        if (
          color &&
          image.altText &&
          colorHandlize(image.altText).includes(colorHandlize(color)) &&
          colorHandlize(image.altText).includes(colorHandlize(dog))
        ) {
          return newImageArray.push(image);
        }
      });

      // if no images come up for a color url, load all images
      if (newImageArray.length === 0) {
        product.images.map(image => {
          newImageArray.push(image);
        });
      }
    } else {
      product.images.map(image => {
        newImageArray.push(image);
      });
    }
    setCurrentImageSet(newImageArray);
    // 2. Sort Sizes and Check That They're Available
    let newSizesArray = [];
    // console.log(color);
    if (color != null) {
      color = color.includes("Left") ? "Left" : color;
      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          // console.log("case 1");
          // console.log(colorHandlize(option.value), colorHandlize(color));
          // the second parameter accounts for gift cards
          if (
            colorHandlize(option.value) === colorHandlize(color) ||
            option.value.includes("$")
          ) {
            newSizesArray.push(variant);
          }
        });
      });

      if (newSizesArray.length === 0) {
        let doesProductHaveColorTag = false;
        product.tags.map(tag => {
          let updatedTag = tag.replace("Color_", "");
          updatedTag = colorHandlize(updatedTag);
          if (updatedTag === colorHandlize(color)) {
            doesProductHaveColorTag = true;
          }
        });

        if (doesProductHaveColorTag) {
          let newFilterCondition = product.images[0].altText
            ? colorHandlize(product.images[0].altText)
            : null;
          // if it's equal to null, there is only one color
          if (newFilterCondition !== null) {
            product.variants.map(variant => {
              variant.selectedOptions.map(option => {
                let handlizedColor = colorHandlize(option.value);
                // if the color includes the filter condition
                if (handlizedColor.includes(newFilterCondition)) {
                  newSizesArray.push(variant);
                }
              });
            });
          }
        }
      }

      // fallback: push all variants
      if (newSizesArray.length === 0) {
        product.variants.map(variant => {
          newSizesArray.push(variant);
        });
      }
    } else {
      product.variants.map(variant => {
        variant.selectedOptions.map(option => {
          newSizesArray.push(variant);
        });
      });
    }
    newSizesArray = newSizesArray.filter(onlyUnique);
    // console.log("array", newSizesArray);
    setCurrentSizeSet(newSizesArray);
    // 3. Set Image Index To First Image and scroll up
    setMainImageIndex(0);
    scrollContainer.current.scrollTop = 0;

    // 5. Select old size variant

    if (userSize != null) {
      // console.log("there is a size ", userSize, newSizesArray);

      // -- loop thru existing sizes, select first available
      newSizesArray.map(variant => {
        let isVariantAvailable = variant.availableForSale;
        variant.selectedOptions.map(option => {
          if (option.value == userSize) {
            if (isVariantAvailable) {
              // console.log("is this running");
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
      // console.log("there is not a size ", userSize);
      for (let i = 0; i < newSizesArray.length; i++) {
        if (newSizesArray[i].availableForSale == true) {
          // console.log("bonus round", newSizesArray[i]);
          setSizeId(newSizesArray[i].shopifyId);
          break;
        }
      }
    }

    // Set variant price

    setCurrentPrice(newSizesArray[0].price);
    setCompareAtPrice(newSizesArray[0].compareAtPrice);
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

  function handleColorClick(color) {
    // console.log(color);
    handleVariantChange(color);
    if (color === "BW") {
      setHoverColor("B&W");
    } else if (color === "NB") {
      setHoverColor("N&B");
    } else {
      setHoverColor(color);
    }
    window.history.replaceState(
      "page2",
      "Title",
      "?color=" + colorHandlize(color)
    );
    setCurrentColor(colorHandlize(color));
  }

  // 4. Update URL

  // const [colorVariants, setColorVariants] = useState();

  function checkTooltipText() {
    // Glove Logic
    if (
      currentImageSet[0] &&
      currentImageSet[0].altText &&
      (!currentImageSet[0].altText
        .toLowerCase()
        .trim()
        .includes("left") ||
        !currentImageSet[0].altText
          .toLowerCase()
          .trim()
          .includes("right")) &&
      hoverColor != currentImageSet[0].altText
    ) {
      if (currentImageSet[0].altText.includes("BW")) {
        setHoverColor("B&W");
        // console.log("case 2");
      } else if (currentImageSet[0].altText === "NB") {
        setHoverColor("N&B");
        // console.log("case 3");
      } else {
        // setHoverColor(currentImageSet[0].altText);
        setHoverColor(currentSizeSet[0].selectedOptions[0].value);
        // console.log("case 4");
      }
    } else {
      setHoverColor(currentSizeSet[0].selectedOptions[0].value);
      // console.log("case 4");
    }
  }

  useEffect(() => {
    // Make sure product isn't an add on
    if (product.title.includes("Add On")) {
      navigate("/");
    }

    // setCurrentColor(colorHandlize(product.images[0].altText));

    tagCheck(product.tags);

    // check for variant in url
    let IsVariantInURL = window.location.search.includes("?color=");

    if (IsVariantInURL) {
      let variantValue = window.location.search.replace("?color=", "");
      if (variantValue.includes("&")) {
        variantValue = variantValue.split("&")[0];
      }
      // console.log(variantValue);
      variantValue = reverseColorHandlize(variantValue);
      handleVariantChange(variantValue);
      setHoverColor(
        variantValue.toLowerCase() === "bw"
          ? "B&W"
          : variantValue.toLowerCase() === "nb"
          ? "N&B"
          : variantValue
      );
    } else {
      handleVariantChange("white");
      // setHoverColor(product.images[0].altText);
      setHoverColor(
        product.images[0].altText &&
          product.images[0].altText.toLowerCase() === "bw"
          ? "B&W"
          : product.images[0].altText &&
            product.images[0].altText.toLowerCase() === "nb"
          ? "N&B"
          : product.images[0].altText &&
            product.images[0].altText.replace("Betsy", "")
      );
    }

    // set to first embroidery option
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
  }

  //   Check for tag
  function tagCheck(tags) {
    tags &&
      tags.map(tag => {
        if (tag.includes("addon-shorts-")) {
          setAnAddonProduct(true);
        }
      });
  }
  // console.log("addon product", isThereAnAddonProduct);

  let availSizes = [];
  currentSizeSet.map(size => {
    if (size.availableForSale) {
      availSizes.push(true);
    }
  });

  // console.log("avail sizes", availSizes);

  function handleColorButtonHover(color) {
    if (color === "BW") {
      setHoverColor("B&W");
    } else if (color === "NB") {
      setHoverColor("N&B");
    } else {
      setHoverColor(color);
    }
  }

  // Don't render related products if there aren't any
  let relatedProductTags = product.tags.filter(tag =>
    tag.includes("addon-rp-")
  );

  // Mark final sale products
  let isProductFinalSale = false;

  product.tags.map(tag => {
    if (tag.toLowerCase() === "final_sale") {
      isProductFinalSale = true;
    }
    return;
  });

  return (
    <Layout>
      <SEO
        title={product.title}
        description={
          product.description &&
          product.description
            .split(" ")
            .slice(0, 160)
            .join(" ")
        }
      >
        <meta
          name="og:image"
          content={
            window.location.origin +
            data.fallbackSeoImage.childImageSharp.original.src
          }
        />
        <meta
          name="image"
          content={
            window.location.origin +
            data.fallbackSeoImage.childImageSharp.original.src
          }
        />
      </SEO>
      <EmbroideryProductPageContainer>
        <Wrapper className="single-product-grid" flex>
          <div className="product-images-container">
            <div className="thumbnail-container">
              <div className="inner-wrap" ref={scrollContainer}>
                {currentImageSet &&
                  currentImageSet.map((image, index) => {
                    return (
                      <button key={index} onClick={() => swapMainImage(index)}>
                        {image.localFile && image.localFile.childImageSharp && (
                          <Img
                            alt={image.altText}
                            fluid={image.localFile.childImageSharp.fluid}
                          />
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="main-photo-container">
              <div className="inner-wrap">
                {mainImageIndex == null
                  ? currentImageSet.slice(0, 1).map((image, index) => {
                      return (
                        image.localFile && (
                          <Img
                            key={index}
                            fluid={image.localFile.childImageSharp.fluid}
                          />
                        )
                      );
                    })
                  : currentImageSet
                      .slice(mainImageIndex, mainImageIndex + 1)
                      .map((image, index) => {
                        return (
                          image.localFile && (
                            <Img
                              key={index}
                              fluid={image.localFile.childImageSharp.fluid}
                            />
                          )
                        );
                      })}
              </div>
            </div>
          </div>
          <div className="product-info-wrapper">
            <div className="inner-wrap">
              <div className="title-container">
                <h1>{product.title}</h1>
                <div className="price-container">
                  <p className="price">
                    {compareAtPrice && <span>${compareAtPrice}</span>}$
                    {parseFloat(currentPrice)}
                  </p>
                  {isProductFinalSale && (
                    <div className="btn-container">
                      <a
                        href={window.location.origin + "/pages/faq#returns#fs"}
                        target="_blank"
                      >
                        Final Sale
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="description-container"
                dangerouslySetInnerHTML={createMarkup()}
              />
              {finalColors.length > 0 && (
                <div className="variant-selector-container color-container">
                  <h4>
                    {currentSizeSet.length > 0 &&
                    (currentSizeSet[0].selectedOptions[0].value === "Left" ||
                      currentSizeSet[0].selectedOptions[0].value === "Right")
                      ? "Select Glove"
                      : "Select Color"}
                  </h4>
                  <div className="inner-wrap">
                    <ul className="colors" onMouseLeave={checkTooltipText}>
                      {finalColors.map((color, i) => {
                        let colorHandle = color
                          .replace(/\s+/g, "-")
                          .replace(/\{/g, "")
                          .replace(/\//g, "-")
                          .replace("&", "")
                          .toLowerCase();

                        return (
                          <li key={i}>
                            <button
                              onMouseEnter={() => handleColorButtonHover(color)}
                              onClick={() => handleColorClick(color)}
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
                </div>
              )}
              {currentSizeSet.length > 0 && (
                <div className="variant-selector-container sizes">
                  <h4>Select Size</h4>
                  <ul>
                    {currentSizeSet.length > 0 &&
                      currentSizeSet.map((size, index) => {
                        let isAvailable = size.availableForSale;

                        let sizeText = size.selectedOptions[1]
                          ? size.selectedOptions[1].value
                          : size.selectedOptions[0].value;
                        return (
                          <li key={index}>
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
                              <X />
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}

              <DogEmbroidery
                emDesign={emDesign}
                setEmDesign={setEmDesign}
                handleVariantChange={handleVariantChange}
                currentColor={currentColor}
                currentImageSet={currentImageSet}
              />

              {isThereAnAddonProduct ? (
                <AddonProduct
                  firstProductVariantId={sizeId}
                  product={product}
                  tags={product.tags}
                  availSizes={availSizes.length}
                  addon={true}
                  em={false}
                />
              ) : (
                <AddToCart
                  availSizes={availSizes.length}
                  availableSizesCount={availableSizes}
                  sizeId={sizeId}
                  addon={false}
                  em={true}
                  emDesign={emDesign}
                />
              )}
            </div>
          </div>
        </Wrapper>

        {relatedProductTags.length > 0 && (
          <RelatedSelling tags={product.tags} />
        )}

        <ProductReviews
          productID={product.shopifyId}
          productName={product.title}
          productHandle={product.handle}
          reviews={data.allGoogleSheetReviewsRow.nodes}
        />
      </EmbroideryProductPageContainer>
    </Layout>
  );
};

export default EmbroideryProductPage;
