import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import Slider from "react-slick";
import styled from "styled-components";
import Img from "gatsby-image";

// Slick
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import RightArrow from "../../images/chevron-right.inline.svg";
import LeftArrow from "../../images/chevron-left.inline.svg";
import { media } from "../helpers";

// gifs
import desktopGIF from "../../images/slides/desktop-slide.gif";
import mobileGIF from "../../images/slides/mobile-slide.gif";

// Slider Container

const SlideContainer = styled.div`
  position: relative;

  a {
    display: block;
    z-index: 10;
    position: relative;
  }
  .desktop-only {
    display: none;
    ${media.medium`display: block;`}
  }
  .mobile-only {
    ${media.medium`display: none;`}
  }

  .mobile-overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 300;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    ${media.medium`display: none;`}

    .overlay-content {
      h2 {
        color: #fff;
      }
    }
  }
`;
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
          fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slideTwo: file(relativePath: { eq: "slides/slide-2.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.

          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slideThree: file(relativePath: { eq: "slides/slide-3.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.

          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slideOneMobile: file(relativePath: { eq: "slides/mobile-slide-1.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.

          fluid(maxWidth: 450) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slideTwoMobile: file(relativePath: { eq: "slides/mobile-slide-2.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.

          fluid(maxWidth: 450) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slideThreeMobile: file(
        relativePath: { eq: "slides/mobile-slide-3.jpg" }
      ) {
        childImageSharp {
          # Specify the image processing specifications right in the query.

          fluid(maxWidth: 450) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
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

  let currentBannerSlideURL = "the-oddyesey";

  return (
    <SliderContainer>
      <Slider {...settings} style={{ marginBottom: 0 }}>
        {/* <SlideContainer>
          <Link to={`/products/foray-x-clubhaus-wedgehog-sweater`}>
            <img className="desktop-only" src={desktopGIF} alt="" />
            <img className="mobile-only" src={mobileGIF} alt="" />
           
          </Link>
        </SlideContainer> */}

        <SlideContainer>
          <Link to={`/collections/society`}>
            <Img
              className="desktop-only"
              fluid={data.slideOne.childImageSharp.fluid}
            />
            <Img
              className="mobile-only"
              fluid={data.slideOneMobile.childImageSharp.fluid}
            />
          </Link>
        </SlideContainer>

        <SlideContainer>
          <Link to={`/collections/society`}>
            <Img
              className="desktop-only"
              fluid={data.slideTwo.childImageSharp.fluid}
            />
            <Img
              className="mobile-only"
              fluid={data.slideTwoMobile.childImageSharp.fluid}
            />
          </Link>
        </SlideContainer>

        <SlideContainer>
          <Link to={`/collections/vanishing-point`}>
            <Img
              className="desktop-only"
              fluid={data.slideThree.childImageSharp.fluid}
            />
            <Img
              className="mobile-only"
              fluid={data.slideThreeMobile.childImageSharp.fluid}
            />
          </Link>
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
