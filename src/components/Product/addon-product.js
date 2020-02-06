import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SizeSelector from "./selectors/size-selector";
import { useStaticQuery, graphql } from "gatsby";
import AddToCart from "./add-to-cart";

const AddonProductContainer = styled.div``;

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
  console.log(data);
  const [addonProductColor, setAddonProductColor] = useState("");
  const [addonSelectedSize, setAddonSelectedSize] = useState("");
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

  console.log(isThereAnAddonProduct);
  return (
    <AddonProductContainer>
      <div className="inner-wrap">
        <h4>Separate Sneaky Pocket Short</h4>
        <SizeSelector
          variantIndicator={addonProductColor}
          allProductVariants={data.allShopifyProduct.edges[0].node}
          addonSelectedSize={addonSelectedSize}
          setAddonSelectedSize={setAddonSelectedSize}
        />
        <AddToCart
          sizeId={firstProductVariantId}
          sizeIdTwo={addonSelectedSize}
        />
      </div>
    </AddonProductContainer>
  );
};

export default AddonProduct;
