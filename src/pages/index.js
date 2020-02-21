import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import SEO from "../components/seo";
import HomePageSlider from "../components/Sliders/home-page-slider";
import HomePageProductSlider from "../components/Sliders/home-page-product-slider";
import SplitSection from "../components/Home/split-section";
import TriGridSection from "../components/Home/tri-grid-section";
import Layout from "../components/layout";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection(filter: { title: { eq: "Home Page Slider" } }) {
        edges {
          node {
            id
            products {
              id
              handle
              title
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
    }
  `);

  // console.log(data);
  let products = data.allShopifyCollection.edges[0].node.products;
  // console.log(products);
  return (
    <Layout>
      <SEO
        title="Home"
        description="Foray Golf is THE Authority for Women's Fashion Golf Apparel. Designed in New York made in the USA, Foray Golf uniquely offers stylish options for the course."
      />
      <HomePageSlider />
      <HomePageProductSlider products={products} />
      <TriGridSection />
      <SplitSection />
    </Layout>
  );
};

export default IndexPage;
