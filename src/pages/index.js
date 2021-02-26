import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { window } from "browser-monads";

import SEO from "../components/seo";
import SplitSection from "../components/home/split-section";
import NewArrivals from "../components/home/new-arrivals";

import Layout from "../components/layout";
import CollectionRows from "../components/home/collection-rows";

const IndexPage = ({ data }) => {
  // const data = useStaticQuery(graphql``);

  let hpsProducts = data.hps.edges[0].node.products;
  let accProducts = data.acc.edges[0].node.products;

  return (
    <Layout>
      <SEO
        title="Home"
        description="Foray Golf is THE Authority for Women's Fashion Golf Apparel. Designed in New York made in the USA, Foray Golf uniquely offers stylish options for the course."
      >
        {data.seoImage.childImageSharp && (
          <meta
            name="og:image"
            content={
              window.location.origin +
              data.seoImage.childImageSharp.original.src
            }
          />
        )}
        {data.seoImage.childImageSharp && (
          <meta
            name="image"
            content={
              window.location.origin +
              data.seoImage.childImageSharp.original.src
            }
          />
        )}
      </SEO>
      <NewArrivals hpsProducts={hpsProducts} />
      <CollectionRows
        collections={
          data?.wpContent?.edges[0]?.node?.home_addons?.homePageCollections
        }
      />
      <SplitSection />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    wpContent: allWpPage(filter: { title: { eq: "Home" } }) {
      edges {
        node {
          id
          home_addons {
            homePageCollections {
              collectionTitle
              collectionHandle
              collectionLastImage {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 500) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    hps: allShopifyCollection(filter: { title: { eq: "Home Page Slider" } }) {
      edges {
        node {
          id
          products {
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
              shopifyId
              image {
                altText
              }

              selectedOptions {
                name
                value
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
    acc: allShopifyCollection(
      filter: { title: { eq: "Logos & Accessories" } }
    ) {
      edges {
        node {
          id
          products {
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
              shopifyId
              image {
                altText
              }

              selectedOptions {
                name
                value
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
    seoImage: file(relativePath: { eq: "seoImages/home-page.jpg" }) {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
`;
