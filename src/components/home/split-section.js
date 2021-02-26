import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import Wrapper from "../org/Wrapper";
import { media } from "../helpers";

const SplitSectionContainer = styled.section`
  .split-section-wrapper {
    display: block;
    ${media.medium`display: flex;`}
  }
  .left-container {
    flex: 1;
  }

  .right-container {
    flex: 1;
  }
`;

const SplitSection = () => {
  const data = useStaticQuery(graphql`
    query {
      leftImage: file(relativePath: { eq: "home/bottom-banner-left.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rightImage: file(relativePath: { eq: "home/bottom-banner-right.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <SplitSectionContainer>
      <Wrapper className="split-section-wrapper" size="fw" flex>
        <div className="left-container">
          <div className="inner-wrap">
            <Link to="/pages/friends-of-foray">
              <Img
                alt="Join Team Foray"
                fluid={data.leftImage.childImageSharp.fluid}
              />
            </Link>
          </div>
        </div>
        <div className="right-container">
          <div className="inner-wrap">
            <Link to="/pages/corporate">
              <Img
                alt="Corporate and Wholesale"
                fluid={data.rightImage.childImageSharp.fluid}
              />
            </Link>
          </div>
        </div>
      </Wrapper>
    </SplitSectionContainer>
  );
};

export default SplitSection;
