import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Wrapper from "../org/Wrapper";
import { motion } from "framer-motion";
import { media } from "../helpers";

const CollectionPanesContainer = styled(motion.div)`
  padding: 70px 0;

  .title-container {
    max-width: 95vw;
    h2 {
      text-align: center;
      margin: 0 0 15px;
      text-transform: uppercase;
      font-size: 17px;
      letter-spacing: 0;
    }
  }

  .slides-container {
    ${media.medium`display: flex;max-width: 95vw;justify-content: center;`}
  }

  .slider-footer {
    text-align: center;
    margin-top: 30px;
    a {
      color: #222;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 0.3px;
      text-decoration: none;
      border-bottom: 3px solid #ccc;
      padding-bottom: 5px;
    }
  }
`;

const CollectionPanes = () => {
  const data = useStaticQuery(graphql`
    query {
      home: allWordpressPage(filter: { title: { eq: "Home" } }) {
        edges {
          node {
            id
            acf {
              collection_panes {
                pane_caption
                pane_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 700, quality: 90) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                pane_title
                pane_link
              }
            }
          }
        }
      }
    }
  `);

  const panes = data.home.edges[0].node.acf.collection_panes;

  const [slideActive, setSlideActive] = useState(2);

  return (
    <CollectionPanesContainer>
      <Wrapper className="title-container">
        <h2>Latest Collections</h2>
      </Wrapper>

      <Wrapper className="slides-container">
        {panes.slice(0, 6).map((pane, index) => {
          return (
            <PaneSlide
              pane={pane}
              key={index}
              index={index}
              slideActive={slideActive}
              setSlideActive={setSlideActive}
            />
          );
        })}
      </Wrapper>
      <div className="slider-footer">
        <Link to="/collections/all">View all</Link>
      </div>
    </CollectionPanesContainer>
  );
};

const PaneSlideContainer = styled(motion.button)`
  flex: 0 0 16.66%;
  margin-right: 10px;
  border: none;
  padding: 0;
  line-height: 1;
  width: 100%;
  text-align: left;
  position: relative;

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.active {
    flex: 0 0 33.33% !important;
  }

  /* &:first-child {
    flex: 0 0 33.33%;
  } */
  &:last-child {
    margin-right: 0px;
  }
  .inner-wrap {
    .image-container {
      position: relative;
      .gatsby-image-wrapper {
        min-height: 300px;
        max-height: 300px;
        overflow: hidden;
        ${media.medium`min-height: 500px;max-height: 500px;`}
      }
      .content-container {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 20px;
        background: -webkit-linear-gradient(
          top,
          #222225 0,
          rgba(37, 33, 30, 0) 100%
        );
        background: linear-gradient(
          to top,
          #222225 0,
          rgba(37, 33, 30, 0) 100%
        );
        width: 100%;

        h3 {
          margin: 0;
          color: #fff;
          font-size: 24px;
          padding-bottom: 2px;
        }

        p {
          color: #ccc;
          font-size: 17px;
          margin-bottom: 0px;
        }
      }
    }
  }
`;

const PaneSlide = ({ pane, setSlideActive, slideActive, index }) => {
  function handleMouseEnter(index) {
    setSlideActive(index);
    // setTimeout(function () {
    // }, 4000);
  }

  const slideRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  function handleHoverIn(index) {
    setIsActive(true);
    setSlideActive(index);
  }

  // function generateExcerpt() {
  //   return { __html: post.excerpt };
  // }

  const { pane_title, pane_image, pane_caption, pane_link } = pane || {};

  return (
    <PaneSlideContainer
      transition={{ duration: 0.4 }}
      href={`/`}
      ref={slideRef}
      animate={{
        flex:
          isActive === true || slideActive === index
            ? "0 0 33.33%"
            : "0 0 16.66%",
      }}
      onHoverStart={() => handleHoverIn(index)}
      onHoverEnd={() => setIsActive(false)}
    >
      <div className="inner-wrap">
        <div className="image-container">
          {pane.pane_image && (
            <Img fluid={pane.pane_image.localFile.childImageSharp.fluid} />
          )}
          <div className="content-container">
            <motion.h3 layout>{pane_title}</motion.h3>
            {/* {(isActive === true || slideActive === index) && (
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                exit={{ y: 10, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {pane_caption}
              </motion.p>
            )} */}
          </div>
        </div>
      </div>
      <Link to={pane_link}></Link>
    </PaneSlideContainer>
  );
};
export default CollectionPanes;
