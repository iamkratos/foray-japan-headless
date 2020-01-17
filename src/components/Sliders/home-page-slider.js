import React from "react";
import { useStaticQuery } from "gatsby";
import Slider from "react-slick";
import styled from "styled-components";
import Img from "gatsby-image";

// Slick
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import RightArrow from "../../images/chevron-right.inline.svg";
import LeftArrow from "../../images/chevron-left.inline.svg";

// Slider Container

const SlideContainer = styled.div``;
const SliderContainer = styled.div`
  img {
    margin-bottom: 0px;
  }
`;

const HomePageSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      slideOne: file(relativePath: { eq: "slides/slide-1.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slideTwo: file(relativePath: { eq: "slides/slide-2.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slideThree: file(relativePath: { eq: "slides/slide-3.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  console.log("data", data);
  var settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrow to="prev" />,
    nextArrow: <SlickArrow to="next" />,
  };
  return (
    <SliderContainer>
      <Slider {...settings} style={{ marginBottom: 0 }}>
        <SlideContainer>
          <Img fluid={data.slideOne.childImageSharp.fluid} />
        </SlideContainer>
        <SlideContainer>
          <Img fluid={data.slideTwo.childImageSharp.fluid} />
        </SlideContainer>
        <SlideContainer>
          <Img fluid={data.slideThree.childImageSharp.fluid} />
        </SlideContainer>
      </Slider>
    </SliderContainer>
  );
};

const SlickArrow = ({ className, to, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`button button--text button--icon ${className}`}
      aria-label={to}
    >
      {to == "prev" ? <LeftArrow /> : <RightArrow />}
    </button>
  );
};

export default HomePageSlider;
