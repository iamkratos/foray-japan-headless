import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../../components/layout";
import Wrapper from "../../components/org/Wrapper";
import PressItem from "../../components/Press/press-item";

const PressContainer = styled.div`
  .title-container {
    padding: 20px 0 0;
    h1 {
      margin-bottom: 0px;
    }
  }
  .feed-index-wrapper {
    display: flex;

    .feed-container {
      flex: 3;
    }
    .sidebar-container {
      flex: 1;
      padding-left: 50px;
    }
  }
`;

const PressV2 = () => {
  const data = useStaticQuery(graphql`
    query {
      allWordpressPage(filter: { title: { eq: "Press" } }) {
        edges {
          node {
            acf {
              press_items {
                article_link
                excerpt
                press_link
                press_logo {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                thumbnail {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 600, quality: 95) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                title
              }
            }
          }
        }
      }
    }
  `);

  let press_items = data.allWordpressPage.edges[0].node.acf.press_items;
  console.log("data", press_items);

  return (
    <Layout>
      <PressContainer>
        <Wrapper>
          <div className="title-container">
            <h1>Press</h1>
          </div>
        </Wrapper>
        <Wrapper className="feed-index-wrapper">
          <div className="feed-container">
            {press_items.map((item, index) => {
              return <PressItem key={index} item={item} />;
            })}
          </div>
          <div className="sidebar-container">
            <div className="inner-wrap">
              <h2>Sidebar</h2>
            </div>
          </div>
        </Wrapper>
      </PressContainer>
    </Layout>
  );
};

export default PressV2;
