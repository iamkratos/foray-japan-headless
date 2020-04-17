import React, { useEffect, useState, useRef } from "react";
import { graphql } from "gatsby";
import LazyLoad from "react-lazyload";
import { window } from "browser-monads";

import Wrapper from "../components/org/Wrapper";
import Layout from "../components/layout";
import styled from "styled-components";
import { media } from "../components/helpers";
import Img from "gatsby-image";
import CollectionProductGridItem from "../components/Product/collection-product-grid-item";
import SEO from "../components/seo";
import ProductFilter from "../components/Filter/filter";

const ProductGridContainer = styled.section`
  flex: 5;

  .no-results {
    font-size: 18px;
    text-align: center;
  }
`;
const BannerContainer = styled.section`
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
    margin-bottom: 30px;
    ${media.medium`display: none; margin-bottom: 0px;`}
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

const Spacer = styled.div`
  height: 40px;
`;

const CollectionContainer = styled.section``;

const CollectionPage = ({ data }) => {
  const collection =
    data.allShopifyCollection.edges[0] &&
    data.allShopifyCollection.edges[0].node;
  const mobileCollectionImage =
    data.allFile.edges[0] && data.allFile.edges[0].node;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterColor, setFilterColor] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterFeature, setFilterFeature] = useState("");
  const [currentColorTooltip, setCurrentColorTooltip] = useState("");
  const [tooltipColor, setTootipColor] = useState("");
  const [collectionMetaImage, setCollectionMetaImage] = useState([]);

  function handleResetFilters() {
    setFilterColor("");
    setFilterSize("");
    setTootipColor("");
    setFilterFeature("");
    setCurrentColorTooltip("");
    setFilteredProducts(collection.products);
  }

  useEffect(() => {
    setFilteredProducts(collection.products);
    // Setup Fallback SEO Image
    if (data.seoImage.edges[0]) {
      setCollectionMetaImage(
        data.seoImage.edges[0].node.childImageSharp.original.src
      );
    } else {
      setCollectionMetaImage(
        data.fallbackSeoImage.childImageSharp.original.src
      );
    }
  }, []);

  return (
    <Layout>
      <SEO title={collection.title}>
        {collectionMetaImage !== "" && (
          <meta
            name="og:image"
            content={window.location.origin + collectionMetaImage}
          />
        )}
        {collectionMetaImage !== "" && (
          <meta
            name="image"
            content={window.location.origin + collectionMetaImage}
          />
        )}
      </SEO>

      {collection.image &&
      collection.image.localFile &&
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
        <Spacer />
      )}

      <CollectionContainer>
        <Wrapper flex>
          <ProductFilter
            setFilterColor={setFilterColor}
            filterColor={filterColor}
            filterSize={filterSize}
            setFilterSize={setFilterSize}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            collection={collection}
            products={collection.products}
            handleResetFilters={handleResetFilters}
            tooltipColor={tooltipColor}
            setTootipColor={setTootipColor}
            currentColorTooltip={currentColorTooltip}
            setCurrentColorTooltip={setCurrentColorTooltip}
            filterFeature={filterFeature}
            setFilterFeature={setFilterFeature}
          />

          <ProductGridContainer>
            {filteredProducts.length === 0 && (
              <h2 className="no-results">No products found.</h2>
            )}
            <Wrapper flex>
              {filteredProducts.map((product, index) => {
                let isProductAddon = product.title.includes("Add On")
                  ? true
                  : false;
                if (isProductAddon) {
                  return;
                }
                return (
                  <LazyLoad key={index} height={200}>
                    <CollectionProductGridItem
                      product={product}
                      filterColor={filterColor}
                      setFilterColor={setFilterColor}
                      filteredProducts={filteredProducts}
                    />
                  </LazyLoad>
                );
              })}
            </Wrapper>
          </ProductGridContainer>
        </Wrapper>
      </CollectionContainer>
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
    seoImage: allFile(
      filter: { relativeDirectory: { eq: "seoImages" }, name: { eq: $handle } }
    ) {
      edges {
        node {
          id
          name
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }

    fallbackSeoImage: file(relativePath: { eq: "seoImages/home-page.jpg" }) {
      childImageSharp {
        original {
          src
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
              compareAtPrice
              availableForSale
              price
              selectedOptions {
                name
                value
              }
              shopifyId
              image {
                altText
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
