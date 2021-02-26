import React from "react";
import Wrapper from "../org/Wrapper";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import styled from "styled-components";
import { media } from "../helpers";

import { Link } from "gatsby";

const TopBarContainer = styled.div`
  background-color: #000;
  padding: 15px 0 12px;
  display: none;
  text-align: center;
  ${media.medium`display: block; padding: 10px 0 7px;`}
  p {
    margin: 0px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    font-family: "Nexa";
    line-height: 1.3;
    ${media.medium`line-height: 1;`}

    a {
      color: #fff;
      margin-left: 5px;
    }
  }

  .right-container {
    .countries {
      width: 100%;
      display: block;
      margin: 0;
      padding: 0;
      list-style: none;
      text-align: right;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      .link {
        display: inline-block;
        margin-right: 20px;
        padding-right: 20px;
        margin-bottom: 0px;
        border-right: 1px solid #777;
        &:last-child {
          margin-right: 0px;
          padding-right: 0px;
          border-right: none;
        }
        a {
          text-decoration: none;
          display: flex;
          span {
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            width: 100%;
            display: inline-block;

            &.text {
              margin-left: 7px;
              position: relative;
              top: -2px;
            }
          }
        }
        .gatsby-image-wrapper {
          min-width: 20px;
          max-width: 20px;
          margin: 0 auto;
          flex: 1;

          img {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
`;

const TopBar = () => {
  const { us, jp } = useStaticQuery(graphql`
    query {
      jp: file(relativePath: { eq: "japan.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      us: file(relativePath: { eq: "us.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <TopBarContainer>
      <Wrapper>
        <div className="left-container">
          {/* <p>
          40% off everything! Discount automatically applied at check out.
          Terms and conditions apply.
          <Link to="/pages/faq/#bf">Details.</Link>
        </p> */}
        </div>
        <div className="right-container">
          <ul className="countries">
            <li className="link">
              <Link to="/">
                <span className="image">
                  <Img fluid={jp?.childImageSharp?.fluid} />
                </span>
                <span className="text">JP</span>
              </Link>
            </li>
            <div className="link">
              <Link to="/">
                <span className="image">
                  <Img fluid={us?.childImageSharp?.fluid} />
                </span>
                <span className="text"> US</span>
              </Link>
            </div>
          </ul>
        </div>
      </Wrapper>
    </TopBarContainer>
  );
};

export default TopBar;
