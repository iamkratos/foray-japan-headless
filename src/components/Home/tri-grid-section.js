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
      leftImage: file(relativePath: { eq: "home/left-n.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rightImageOne: file(relativePath: { eq: "home/right-1-n.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rightImageTwo: file(relativePath: { eq: "home/right-2-n.jpg" }) {
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
            <Link to="/collections/dream-weaver">
              <Img fluid={data.leftImage.childImageSharp.fluid} />
              <div className="overlay">
                <div className="overlay-content">
                  <h3>Dream Weaver</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="right-container">
          <div className="image-container">
            <Link to="/collections/graphic-floral-collection">
              <Img fluid={data.rightImageOne.childImageSharp.fluid} />
              <div className="overlay">
                <div className="overlay-content">
                  <h3>Graphic Floral</h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="image-container">
            <Link to="/collections/d-luxe">
              <Img fluid={data.rightImageTwo.childImageSharp.fluid} />
              <div className="overlay">
                <div className="overlay-content">
                  <h3>D-Luxe</h3>
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
