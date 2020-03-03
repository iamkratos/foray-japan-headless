import React, { useState } from "react";
import styled from "styled-components";

import ProductGridItem from "../Product/product-grid-item";
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

const RelatedSelling = ({ tags, allProducts }) => {
  // const [relatedProducts, setRelatedProducts] = useState([]);
  let relatedProductTags = tags.filter(tag => tag.includes("addon-rp-"));
  let relatedProducts = [];
  allProducts.map(productNode => {
    let product = productNode.node;
    // console.log(product);
    product.tags.length > 0 &&
      relatedProductTags.map(tag => {
        let formattedTag = tag.substring(2).replace("addon-rp-", "");
        let position = parseFloat(tag.slice(0, 1) - 1);
        console.log(formattedTag, position);
        if (product.handle === formattedTag) {
          // relatedProducts.push(product);
          // relatedProducts.push(product);
          relatedProducts.splice(position, 0, product);
        }
      });
  });

  // let relatedProducts = allProducts.filter(product);
  console.log("tags", relatedProducts, relatedProductTags);
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
        {relatedProducts.slice(0, 3).map(product => {
          return <ProductGridItem product={product} />;
        })}
      </Wrapper>
    </RelatedSellingContainer>
  );
};

export default RelatedSelling;
