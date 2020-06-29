import React, { useState } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

import { useAllProductsQuery } from "../../queries/all-products";

import RelatedProductGridItem from "../Product/related-product-grid-item";
import Wrapper from "../org/Wrapper";
import { media } from "../helpers";

const RelatedSellingContainer = styled.section`
  padding: 70px 0 40px;
  &.hide {
    display: none;
  }

  .title-container {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      margin: 0;
      font-size: 17px;
    }
  }
  .related-products-wrapper {
    ${media.medium`display: flex;`}

    > div {
      flex: 0 0 33%;
      > .inner-wrap {
        ${media.medium`max-width: 90%;`}
      }
    }
  }
`;

const RelatedSelling = ({ tags }) => {
  const { edges } = useAllProductsQuery();
  let relatedProductTags = tags.filter(tag => tag.includes("addon-rp-"));
  console.log(relatedProductTags);
  let relatedProducts = [];
  edges.map(productNode => {
    let product = productNode.node;
    product.tags.length > 0 &&
      relatedProductTags.map(tag => {
        let formattedTag = tag.substring(2).replace("addon-rp-", "");
        formattedTag = formattedTag.split("#")[0];
        let position = parseFloat(tag.slice(0, 1) - 1);
        if (product.handle === formattedTag) {
          relatedProducts.splice(position, 0, product);
        }
      });
  });
  relatedProducts = relatedProducts.slice(0, 3);
  console.log("relate dproducts", relatedProducts);

  return (
    <RelatedSellingContainer
      className={relatedProductTags.length > 0 ? "" : "hide"}
    >
      <Wrapper>
        <div className="title-container">
          <h2>Related Products</h2>
        </div>
      </Wrapper>
      <Wrapper className="related-products-wrapper">
        {relatedProducts.map((product, index) => {
          console.log(index);
          let presetColor = null;
          if (relatedProductTags[index].includes("#")) {
            presetColor = relatedProductTags[index].split("#")[1];
          }
          console.log("preset", presetColor, relatedProductTags[index]);
          return (
            <RelatedProductGridItem
              key={index}
              product={product}
              rpColor={presetColor}
            />
          );
        })}
      </Wrapper>
    </RelatedSellingContainer>
  );
};

export default RelatedSelling;
