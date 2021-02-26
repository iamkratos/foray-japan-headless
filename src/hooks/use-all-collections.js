import { useStaticQuery, graphql } from "gatsby";
export const useAllCollections = () => {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection {
          edges {
            node {
              id
              handle
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
    `
  );
  return allShopifyCollection;
};
