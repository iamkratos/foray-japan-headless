import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { Link } from "gatsby";

import { useAllCollections } from "../../hooks/use-all-collections";
import { media } from "../helpers";
import Wrapper from "../org/Wrapper";
import BasicProductGridItem from "../product/basic-product-grid-item";

const CollectionRowsContainer = styled.div`
  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    h4 {
      margin-bottom: 0px;
      margin-right: 7px;
    }
    span {
      margin-right: 7px;
    }

    a {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: bold;
      color: #777;
      text-decoration: none;
    }
  }
  .collection-row-wrapper {
    margin: 0 5.2vw;

    .product-grid-container {
      display: flex; flex-wrap: wrap;

      > * {
        flex: 0 0 50%;
        &:first-child {
          flex: 1 1 100%;
          margin-bottom: 30px;
          ${media.small`flex: 0 0 33.33%; margin-bottom: 0px;`}
          ${media.medium`flex: 0 0 25%;`}
          ${media.large`flex: 0 0 12.5%;`}
        }
        ${media.small`flex: 0 0 33.33%;`}
        ${media.medium`flex: 0 0 25%;`}
        ${media.large`flex: 0 0 12.5%;`}
      }

      /* .last-item-container {
        .gatsby-image-wrapper {
          min-height: 400px;
          img {
            margin-bottom: 0px;
            object-fit: contain !important;
          }
        }
      } */
    }
  }
`;

const CollectionRows = ({ collections }) => {
  const { edges } = useAllCollections();
  let filteredCollections = [];
  let filteredImages = [];

  collections &&
    collections.map(userSelectedCollection => {
      edges.map(edge => {
        if (edge.node.handle === userSelectedCollection.collectionHandle) {
          filteredCollections.push(edge.node);
          filteredImages.push(userSelectedCollection.collectionLastImage);
        }
      });
    });

  console.log("filteredCollections", filteredCollections);
  return (
    <CollectionRowsContainer>
      {filteredCollections.map((collection, collectionIndex) => {
        const { title, products } = collection;
        return (
          <div className="collection-row-container">
            <Wrapper className="title-container">
              <h4>{collection.title}</h4>
              <span>/</span>
              <Link to={`/collections/${collection.handle}`}>View All</Link>
            </Wrapper>
            <Wrapper className="collection-row-wrapper">
              <div className="product-grid-container">
                <div className="last-item-container">
                  <div className="inner-wrap">
                    <Link to={`/collections/${collection.handle}`}>
                      <div className="image-container">
                        <Img
                          fluid={
                            filteredImages[collectionIndex].localFile
                              .childImageSharp.fluid
                          }
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                {collection.products.slice(0, 7).map((product, index) => {
                  return <BasicProductGridItem key={index} product={product} />;
                })}
              </div>
            </Wrapper>
          </div>
        );
      })}
    </CollectionRowsContainer>
  );
};

export default CollectionRows;
