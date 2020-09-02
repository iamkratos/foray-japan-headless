import React from "react";
import { graphql, navigate, Link } from "gatsby";
import StandardProductPage from "./standard-product";
import EmbroideryProductPage from "./embroidery-product";

const ProductPage = ({ data }) => {
  const product = data.allShopifyProduct.edges[0].node;

  if (product.handle === "core-embroidery") {
    return <EmbroideryProductPage data={data} />;
  } else {
    return <StandardProductPage data={data} />;
  }
};

export default ProductPage;

export const query = graphql`
  query($handle: String!) {
    fallbackSeoImage: file(relativePath: { eq: "seoImages/home-page.jpg" }) {
      childImageSharp {
        original {
          src
        }
      }
    }

    allShopifyProduct(filter: { handle: { eq: $handle } }) {
      edges {
        node {
          shopifyId
          id
          handle
          title
          tags
          productType
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
          descriptionHtml
          description
          variants {
            availableForSale
            compareAtPrice
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
    allGoogleSheetReviewsRow(filter: { producthandle: { eq: $handle } }) {
      nodes {
        reviewername
        stars
        revieweremail
        productname
        productid
        reviewbody
        reviewtitle
        date
      }
    }
  }
`;
