import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Wrapper from "../components/org/Wrapper";
import { media } from "../components/helpers";

const CollectionsIndexContainer = styled.section`
  padding: 40px 0;
  .title-container {
    text-align: center;
    h1 {
      font-size: 24px;
      color: #4a4a4a;
    }
  }
`;

const CollectionsIndex = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection {
        edges {
          node {
            title
            handle
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 800, quality: 95) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  let collections = data.allShopifyCollection.edges.filter(
    edge =>
      edge.node.title !== "PRODUCTS" &&
      edge.node.title !== "ALL PRODUCTS" &&
      edge.node.title !== "Beyond Limited Edition" &&
      edge.node.title !== "Last Chance" &&
      edge.node.title !== "Core Pants" &&
      edge.node.title !== "Beyond Limited Edition" &&
      edge.node.title !== "AAA SECURITY BLEACH COLLECTION" &&
      edge.node.title !== "FORAYGOLF x ROBYNPRICE" &&
      edge.node.title !== "Core Polos" &&
      edge.node.title !== "Core Skirt" &&
      edge.node.title !== "Core Half Zip" &&
      edge.node.title !== "Core LS" &&
      edge.node.title !== "Home Page Slider" &&
      edge.node.title !== "Gloves" &&
      edge.node.title !== "Temp" &&
      edge.node.title !== "Fancy Friend" &&
      edge.node.title !== "Girl Boss" &&
      edge.node.title !== "Golf Nerd" &&
      edge.node.title !== "HEAVY PETAL COLLECTION" &&
      edge.node.title !== "SPACE INVADERS COLLECTION" &&
      edge.node.title !== "Power Pleats" &&
      edge.node.title !== "5 POINTZ COLLECTION" &&
      edge.node.title !== "Toile Collection" &&
      edge.node.title !== "GHOST DOG COLLECTION" &&
      edge.node.title !== "FANCY CHICKEN COLLECTION" &&
      edge.node.title !== "NIGHTCRAWLER COLLECTION" &&
      edge.node.title !== "HOT MESH COLLECTION" &&
      edge.node.title !== "NEON DENTIST COLLECTION" &&
      edge.node.title !== "Black Friday" &&
      edge.node.title !== "Home Page"
  );

  console.log(collections);
  return (
    <Layout>
      <SEO title="All Collections" />
      <CollectionsIndexContainer>
        <Wrapper>
          <div className="title-container">
            <h1>All Collections</h1>
          </div>
        </Wrapper>
        <Wrapper className="collection-grid-container">
          {collections.map(collection => {
            return <CollectionGridItem collection={collection} />;
          })}
        </Wrapper>
      </CollectionsIndexContainer>
    </Layout>
  );
};

const CollectionGridItemContainer = styled.div`
  margin-bottom: 30px;
  .inner-wrap {
    ${media.medium`max-width: 800px; margin: 0 auto;`}
  }
`;

const CollectionGridItem = ({ collection }) => {
  console.log(collection);
  return (
    <CollectionGridItemContainer>
      <div className="inner-wrap">
        <Link to={`/collections/${collection.node.handle}`}>
          <div className="image-container">
            {collection.node.image &&
              collection.node.image.localFile &&
              collection.node.image.localFile.childImageSharp && (
                <Img
                  fluid={collection.node.image.localFile.childImageSharp.fluid}
                />
              )}
          </div>
          <div className="content-container">
            <div className="inner-wrap">
              {/* <h4>{collection.node.title}</h4> */}
            </div>
          </div>
        </Link>
      </div>
    </CollectionGridItemContainer>
  );
};

export default CollectionsIndex;
