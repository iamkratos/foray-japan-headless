import React, { useState } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";
import { motion } from "framer-motion";
import Img from "gatsby-image";
import { animated, useTransition } from "react-spring";

import Wrapper from "../org/Wrapper";

import Facebook from "../../images/facebook.inline.svg";
import Instagram from "../../images/instagram.inline.svg";
import Twitter from "../../images/twitter.inline.svg";

const ForayProsContainer = styled.div`
  padding: 70px 0;

  .pros-container {
    display: flex;
  }

  &.active {
    /* .overlay {
      position: fixed;
      background-color: rgba(0, 0, 0, 0.5);
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 1000;
    } */
  }
`;

const ForayPros = () => {
  const data = useStaticQuery(graphql`
    query {
      allWordpressWpPros {
        edges {
          node {
            title
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            acf {
              instagram
            }
          }
        }
      }
    }
  `);

  const pros = data.allWordpressWpPros.edges;
  return (
    <ForayProsContainer className="active">
      <div className="overlay"></div>
      <Wrapper>
        <div className="text-container">
          <h2>Meet our pros</h2>
        </div>
        <div className="pros-container">
          {pros.map((proNode, index) => {
            let pro = proNode.node;

            return <ProCard key={index} pro={pro} />;
          })}
        </div>
      </Wrapper>
    </ForayProsContainer>
  );
};

const ProCardContainer = styled(motion.div)`
  flex: 0 0 20%;
  position: relative;
  left: 0;
  top: 0;
  width: auto;
  button {
    width: 100%;
    border: none;
    background-color: transparent;

    &:active,
    &:focus {
      outline: 0;
    }
  }
  .inner-wrap {
    position: relative;
    .image-container {
      max-width: 300px;
      margin: 0 auto;
      clip-path: circle(50% at 50% 50%);
    }

    .content-container {
      position: absolute;
      left: 0;
      width: 100%;
      text-align: center;
      bottom: 0;

      h3 {
        max-width: 170px;
        margin: 0 auto;
        font-size: 17px;
        padding: 10px 7px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #4a4a4a;
      }

      .hidden-content {
        display: none;

        ul {
          margin: 0;
          padding: 0;
          list-style: none;

          li {
            margin-bottom: 0px;
            a {
              color: #000;
            }
          }

          &.questions {
            font-size: 14px;
            margin: 10px 0;
            li {
              margin-bottom: 5px;
              display: block;
              &:last-child {
                margin-right: 0px;
              }
              span {
                font-size: 13px;
                font-weight: bold;
                text-transform: uppercase;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }

  &.open {
    position: fixed;
    top: 20vh;
    left: 0;
    z-index: 1200;
    width: 100%;

    .inner-wrap {
      background-color: #fff;
      max-width: 750px;
      margin: 0 auto;
      padding: 40px;
      border-radius: 4px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

      .content-container {
        position: relative;

        h3 {
          font-size: 21px;
          border: none;
        }

        .hidden-content {
          display: block;
        }

        p {
          font-size: 16px;
        }
      }
    }
  }
`;

const OverlayContainer = styled(animated.div)`
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  height: 100vh;
  z-index: 1000;
`;

const Overlay = ({ style }) => {
  return <OverlayContainer style={{ ...style }}>hey</OverlayContainer>;
};

const ProCard = ({ pro }) => {
  const [isActive, setIsActive] = useState(false);
  const overlayTransitions = useTransition(isActive, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      <ProCardContainer layout className={isActive ? "open" : ""}>
        <motion.div
          transition={{ duration: 0.45 }}
          layout
          className="inner-wrap"
        >
          <button onClick={() => setIsActive(!isActive)}>
            <motion.div animate className="image-container">
              <Img fluid={pro.featured_media.localFile.childImageSharp.fluid} />
            </motion.div>
          </button>
          <div className="content-container">
            <h3>{pro.title}</h3>
            <div className="hidden-content">
              <ul className="social">
                <li>
                  <a target="_blank" href={pro.acf.instagram}>
                    <Instagram />
                  </a>
                </li>
              </ul>
              <ul className="questions">
                <li>
                  <span>Favorite Course: </span> The Olympic Club
                </li>
                <li>
                  <span>Favorite Foray Item: </span>{" "}
                  <Link to="/">Core 2.0 Skirt</Link>
                </li>
              </ul>

              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptas eos doloremque natus, repudiandae temporibus neque
                dolore alias ipsa reprehenderit dignissimos mollitia nesciunt
                fugiat est facere officia modi, esse aut sapiente!
              </p>
            </div>
          </div>
        </motion.div>
      </ProCardContainer>
      {overlayTransitions.map(({ item, key, props }) => {
        return item && <Overlay key={key} style={props} />;
      })}
    </>
  );
};

export default ForayPros;
