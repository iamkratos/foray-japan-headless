import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import Wrapper from "../org/Wrapper";
import { TransitionMixin, media } from "../helpers";

const TriGridContainer = styled.section`
  .tri-grid-wrapper {
    display: block;
    ${media.medium`display: flex;`}
  }
  .left-container {
    flex: 1;
  }

  .right-container {
    flex: 1;
  }

  .image-container {
    position: relative;

    a {
      &:hover {
        .overlay {
          opacity: 1;
        }
      }
    }

    .overlay {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;

      ${media.medium`opacity: 0;`}
      ${TransitionMixin(".25s")}

      .overlay-content {
        h3 {
          color: #fff;
          font-size: 24px;
          margin: 0px;
          ${media.medium`font-size: 40px;`}
        }
      }
    }
  }
`;

const TriGridSection = () => {
  const data = useStaticQuery(graphql`
    query {
      leftImage: file(relativePath: { eq: "home/left-1-1.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rightImageOne: file(relativePath: { eq: "home/right-1.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rightImageTwo: file(relativePath: { eq: "home/right-2.jpg" }) {
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
    <TriGridContainer>
      <Wrapper className="tri-grid-wrapper" size="fw" flex>
        <div className="left-container">
          <div className="image-container">
            <Link to="/collections/day-glo">
              <Img fluid={data.leftImage.childImageSharp.fluid} />
              <div className="overlay">
                <div className="overlay-content">
                  <h3>Day Glo</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="right-container">
          <div className="image-container">
            <Link to="/collections/in-the-fold">
              <Img fluid={data.rightImageOne.childImageSharp.fluid} />
              <div className="overlay">
                <div className="overlay-content">
                  <h3>In The Fold</h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="image-container">
            <Link to="/collections/incognito">
              <Img fluid={data.rightImageTwo.childImageSharp.fluid} />
              <div className="overlay">
                <div className="overlay-content">
                  <h3>Incognito</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Wrapper>
    </TriGridContainer>
  );
};

export default TriGridSection;
