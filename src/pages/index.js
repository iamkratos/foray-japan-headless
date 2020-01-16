import React from "react";
import { Link, useStaticQuery } from "gatsby";
import LazyLoad from "react-lazyload";

import Wrapper from "../components/org/Wrapper";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import ProductGridItem from "../components/Product/product-grid-item";

import styled from "styled-components";

const ProductGridContainer = styled.section`
  margin-top: 40px;
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection(
        filter: { title: { eq: "Graphic Floral Collection" } }
      ) {
        edges {
          node {
            id
            products {
              id
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
              handle
              descriptionHtml
              variants {
                availableForSale
                shopifyId
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
      <SEO title="Home" />
      <ProductGridContainer>
        <Wrapper flex>
          {products.map(product => {
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

export default IndexPage;
