import React, { useEffect, useState, useContext, useRef } from "react";
import { graphql } from "gatsby";
import LazyLoad from "react-lazyload";
import { StoreContext } from "../context/StoreContext";
import Wrapper from "../components/org/Wrapper";
import Layout from "../components/layout";
import styled from "styled-components";
import { TransitionMixin } from "../components/helpers";
import Img from "gatsby-image";
import ProductGridItem from "../components/Product/product-grid-item";

const ProductGridContainer = styled.section`
  margin-top: 40px;
`;
const BannerContainer = styled.section``;

const CollectionPage = ({ data }) => {
  const collection = data.allShopifyCollection.edges[0].node;
  console.log(data);
  console.log("collection image", collection.image);
  return (
    <Layout>
      {collection.image && collection.image.localFile && (
        <BannerContainer>
          <Img fluid={collection.image.localFile.childImageSharp.fluid} />
        </BannerContainer>
      )}

      <h1>Collection page</h1>

      <ProductGridContainer>
        <Wrapper flex>
          {collection.products.map(product => {
            return (
              <LazyLoad height={200}>
                <ProductGridItem product={product} />
              </LazyLoad>
            );
          })}
        </Wrapper>
      </ProductGridContainer>
    </Layout>
  );
};

export const query = graphql`
  query($handle: String!) {
    allShopifyCollection(filter: { handle: { eq: $handle } }) {
      edges {
        node {
          image {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          title
          products {
            availableForSale
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            handle
            images {
              id
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            productType
            shopifyId
            tags
            title
            variants {
              availableForSale
              selectedOptions {
                name
                value
              }
              shopifyId
              image {
                localFile {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default CollectionPage;
