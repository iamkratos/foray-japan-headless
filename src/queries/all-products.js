import React from "react";

import { useStaticQuery, graphql } from "gatsby";
export const useAllProductsQuery = () => {
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query allProductsQuery {
        allShopifyProduct {
          edges {
            node {
              id
              handle
              title
              tags
              images {
                altText
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 95) {
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
              variants {
                availableForSale
                id
                shopifyId
                image {
                  originalSrc
                  altText
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
    `
  );
  return allShopifyProduct;
};
