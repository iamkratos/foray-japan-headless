import React from "react";
import { graphql } from "gatsby";

import Wrapper from "../components/org/Wrapper";
import Layout from "../components/layout";
import styled from "styled-components";

const ProductPageContainer = styled.section`
  padding: 40px 0;
`;

const ProductPage = ({ data }) => {
  console.log(data);
  let product = data.allShopifyProduct.edges[0].node;
  function createMarkup() {
    return { __html: product.descriptionHtml };
  }
  return (
    <Layout>
      <ProductPageContainer>
        <Wrapper>
          <div className="product-images-container">
            <div className="thumbnail-container"></div>
            <div className="main-photo-container"></div>
          </div>
          <div className="product-info-wrapper">
            <div className="inner-wrap">
              <h1>{product.title}</h1>
              <div dangerouslySetInnerHTML={createMarkup()} />
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
          descriptionHtml
          variants {
            availableForSale
            id
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
