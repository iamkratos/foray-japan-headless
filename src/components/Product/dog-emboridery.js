import React, { useState, useEffect, useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

import { TransitionMixin, media } from "../helpers";
import { StoreContext } from "../../context/StoreContext";

const DogEmbroideryContainer = styled.div`
  margin: 20px 0;
  order: 2;
  ${media.medium`margin: 30px 0 0;`}

  h4 {
    text-transform: uppercase;
    font-weight: bold;
    color: #4a4a4a;
    -webkit-letter-spacing: 1px;
    -moz-letter-spacing: 1px;
    -ms-letter-spacing: 1px;
    letter-spacing: 1px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      display: inline-block;

      button {
        -webkit-appearance: none;
        border: none;
        padding: 0;
        background-color: transparent;
        ${TransitionMixin(".25s")};
        &:focus,
        &:active {
          outline: 0;
        }
        &.active,
        &:hover {
          transform: scale(1.15);
        }
        .gatsby-image-wrapper {
          min-width: 70px;
        }
      }
    }
  }
`;

const DogEmbroidery = ({
  emDesign,
  setEmDesign,
  handleVariantChange,
  currentColor,
  currentImageSet,
}) => {
  const data = useStaticQuery(graphql`
    query {
      beagle: file(relativePath: { eq: "dogs/beagle.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      bichon: file(relativePath: { eq: "dogs/bichon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      frenchBulldog: file(relativePath: { eq: "dogs/french-bulldog.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      germanShepherd: file(relativePath: { eq: "dogs/german-shepard.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      goldenRetriever: file(relativePath: { eq: "dogs/golden-retiever.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      husky: file(relativePath: { eq: "dogs/husky.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pomeranian: file(relativePath: { eq: "dogs/pomeranian.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const dogs = [
    {
      title: "Betsy",
      image: data.beagle.childImageSharp.fluid,
    },
    {
      title: "Lorena",
      image: data.bichon.childImageSharp.fluid,
    },
    {
      title: "Nancy",
      image: data.frenchBulldog.childImageSharp.fluid,
    },
    {
      title: "Jack",
      image: data.germanShepherd.childImageSharp.fluid,
    },
    {
      title: "Arnie",
      image: data.goldenRetriever.childImageSharp.fluid,
    },
    {
      title: "Seve",
      image: data.husky.childImageSharp.fluid,
    },
    {
      title: "Hagen",
      image: data.pomeranian.childImageSharp.fluid,
    },
  ];

  function handleHover(dogName) {
    setTooltip(dogName);
  }

  function handleMouseLeave() {
    setTooltip(emDesign);
  }

  const { reverseColorHandlize, colorHandlize } = useContext(StoreContext);

  const [tooltip, setTooltip] = useState("");

  function handleDogChange(dogName) {
    setEmDesign(dogName);
    if (currentColor === "" && currentImageSet[0].altText) {
      handleVariantChange(
        colorHandlize(currentImageSet[0].altText.split(" ")[0]),
        dogName
      );
    } else {
      handleVariantChange(currentColor, dogName);
    }
  }

  useEffect(() => {
    if (emDesign !== "") {
      setTooltip(emDesign);
    }
  }, []);

  return (
    <DogEmbroideryContainer>
      <div className="inner-wrap">
        <h4>Select Embroidery Design</h4>
        <ul onMouseLeave={() => handleMouseLeave()}>
          {dogs.map((dog, index) => {
            return (
              <li key={index}>
                <button
                  className={emDesign === dog.title ? "active" : ""}
                  onClick={() => handleDogChange(dog.title)}
                  onMouseOver={() => handleHover(dog.title)}
                >
                  <Img fluid={dog.image} />
                </button>
              </li>
            );
          })}
        </ul>
        {tooltip !== null && tooltip !== "" ? (
          <div className="tooltip-container">
            <div className="inner-wrap">{tooltip}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </DogEmbroideryContainer>
  );
};

export default DogEmbroidery;
