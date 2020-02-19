import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SizeSelector from "./selectors/size-selector";
import { useStaticQuery, graphql } from "gatsby";
import AddToCart from "./add-to-cart";

const AddonProductContainer = styled.div`
  margin-top: 40px;
  .inner-wrap {
    h4 {
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 0.5px;
      color: #000;
    }
  }
`;

const AddonProduct = ({ product, tags, firstProductVariantId }) => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyProduct(
        filter: { handle: { eq: "separate-sneaky-pocket-short" } }
      ) {
        edges {
          node {
            id
            variants {
              id
              title
              shopifyId
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `);

  const [addonProductColor, setAddonProductColor] = useState("");
  const [addonSelectedSize, setAddonSelectedSize] = useState("");
  const [childProductSize, setChildProductSize] = useState("");
  // const [childProductSize, setChildProductSize] = useState("");
  let isThereAnAddonProduct = false;
  useEffect(() => {
    tagCheck(tags);
  }, []);

  //   Check for tag
  function tagCheck(tags) {
    tags &&
      tags.map(tag => {
        if (tag.includes("addon-shorts-")) {
          isThereAnAddonProduct = true;
          setAddonProductColor(tag.replace("addon-shorts-", ""));
        }
      });
  }

  return (
    <AddonProductContainer>
      <div className="inner-wrap">
        <h4>Separate Sneaky Pocket Short</h4>
        <SizeSelector
          variantIndicator={addonProductColor}
          allProductVariants={data.allShopifyProduct.edges[0].node}
          addonSelectedSize={addonSelectedSize}
          setAddonSelectedSize={setAddonSelectedSize}
          childProductSize={childProductSize}
          setChildProductSize={setChildProductSize}
        />
        <AddToCart
          sizeId={firstProductVariantId}
          sizeIdTwo={addonSelectedSize}
          childProductSize={childProductSize}
        />
      </div>
    </AddonProductContainer>
  );
};

export default AddonProduct;
