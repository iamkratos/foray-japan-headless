import React, { useEffect, useState, useContext, useRef } from "react";
import { graphql } from "gatsby";
import LazyLoad from "react-lazyload";

import Wrapper from "../components/org/Wrapper";
import Layout from "../components/layout";
import styled from "styled-components";
import { TransitionMixin, media } from "../components/helpers";
import Img from "gatsby-image";
import ProductGridItem from "../components/Product/product-grid-item";
import SEO from "../components/seo";
import ProductFilter from "../components/Filter/filter";

const ProductGridContainer = styled.section``;
const BannerContainer = styled.section`
  padding-bottom: 30px;
  ${media.medium`padding-bottom: 30px;`}

  &.no-pad-bottom {
    padding-bottom: 0px;
    ${media.medium`padding-bottom: 0px;`}
  }
  img {
    margin-bottom: 0px;
  }

  .desktop-only {
    display: none;
    ${media.medium`display: block;`}
  }

  .mobile-only {
    ${media.medium`display: none;`}
  }

  .title-container {
    text-align: center;
    padding: 30px 0;
    display: block;
    ${media.medium`display: none;`}

    h1 {
      margin-bottom: 0px;
      font-size: 18px;
      text-transform: uppercase;
      letter-spacing: 1px;
      ${media.medium`display: none;`}
    }
  }
`;

const TitleContainer = styled.div`
  .title-container {
    padding-top: 20px;
    text-align: center;
    padding: 30px 0;

    h1 {
      margin-bottom: 0px;
      font-size: 18px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
`;

const CollectionPage = ({ data }) => {
  const collection =
    data.allShopifyCollection.edges[0] &&
    data.allShopifyCollection.edges[0].node;
  const mobileCollectionImage =
    data.allFile.edges[0] && data.allFile.edges[0].node;

  const [filteredProducts, setFilteredProducts] = useState([]);

  let productGridItems =
    filteredProducts && filteredProducts.length > 0
      ? filteredProducts
      : collection.products;
  return (
    <Layout>
      <SEO title={collection.title} />
      {collection.image &&
      collection.image.localFile.childImageSharp != null ? (
        <BannerContainer
          className={mobileCollectionImage === null ? "no-pad-bottom" : ""}
        >
          <Img
            className="desktop-only"
            fluid={collection.image.localFile.childImageSharp.fluid}
          />
          {mobileCollectionImage ? (
            <Img
              className="mobile-only"
              fluid={mobileCollectionImage.childImageSharp.fluid}
            />
          ) : (
            <TitleContainer className="mobile-padding">
              <div className="title-container">
                <h1>{collection.title}</h1>
              </div>
            </TitleContainer>
          )}
        </BannerContainer>
      ) : (
        <TitleContainer>
          <div className="title-container">
            <h1>{collection.title}</h1>
          </div>
        </TitleContainer>
      )}

      {/* <ProductFilter
        setFilteredProducts={setFilteredProducts}
        filteredProducts={filteredProducts}
        products={collection.products}
      /> */}

      <ProductGridContainer>
        <Wrapper flex>
          {productGridItems.map(product => {
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
    allFile(
      filter: {
        relativeDirectory: { eq: "collections" }
        name: { eq: $handle }
      }
    ) {
      edges {
        node {
          id
          childImageSharp {
            fluid(maxWidth: 992) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
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
            options {
              name
              values
            }
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
