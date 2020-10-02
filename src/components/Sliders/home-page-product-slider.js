import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { window } from "browser-monads";
import { Link } from "gatsby";

// Slick
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import ProductGridItem from "../../components/Product/product-grid-item";
import Wrapper from "../org/Wrapper";
import RightArrow from "../../images/chevron-right.inline.svg";
import LeftArrow from "../../images/chevron-left.inline.svg";
import { media, TransitionMixin } from "../helpers";

// Slider Container

const SlideContainer = styled.div`
  &:active,
  &:focus {
    outline: 0;
  }
`;
const SliderContainer = styled.div`
  padding: 40px 0;
  &.flipped {
    .slider-grid {
      .content-container {
        align-items: center;
        display: flex;
        justify-content: center;
        ${media.medium`order: 2;`}

        .inner-wrap {
          h1 {
            margin: 0 0 20px;
            ${media.medium`margin: 0;`}
          }
        }
      }
      .product-slider-container {
        ${media.medium`order: 1;`}
      }
      .slick-arrows-container {
        margin: 20px 0;
        position: relative;
        top: -40px;
        display: none;

        ${media.medium`display: block; top: 0; left: -20px;margin: 19vh 0 0;`}
      }
    }
  }
  .slider-grid {
    flex-wrap: nowrap;
    display: block;
    ${media.medium`display: flex;`}
    .content-container {
      flex: 1;
      .inner-wrap {
        text-align: center;

        .title-with-link {
          h1 {
            margin-bottom: 0px;
            ${media.medium` margin: 20% 0 0;`}
          }

          a {
            margin-bottom: 20px;
            ${media.medium`margin: 0;`}
          }
        }

        h1 {
          font-size: 24px;
          margin: 0 0 20px;
          text-align: center;

          br {
            display: none;
            ${media.medium`display: block;`}
          }
          ${media.medium`text-align: left; margin: 20% 0 0; font-size: 40px;`}
        }
        a {
          text-align: center;
          display: inline-block;
          font-weight: bold;
          color: #777;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 13px;
          margin-top: 5px;
          letter-spacing: 0.3px;
          ${TransitionMixin(".25s")}

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    .product-slider-container {
      flex: 3;
      width: 100%;
      overflow: hidden;

      .slick-slide {
        > div {
          > div {
            > div {
              margin-bottom: 0px;
              > .inner-wrap {
                max-width: 400px;
                margin: 0 auto;
                ${media.medium`max-width: 90%;`}
              }
            }
          }
        }
      }
    }
  }
  .slick-arrows-container {
    margin: 20px 0;
    position: relative;
    top: -40px;
    display: none;

    ${media.medium`display: block; top: 0; right: -20px;margin: 19vh 0 0;`}

    .inner-wrap {
      display: flex;
      justify-content: center;
      ${media.medium`display: block;`}
    }
    button {
      display: block;
      background-color: #fff;
      line-height: 1;
      box-shadow: none;
      border: 1px solid #000;
      border-radius: 50%;
      background-color: #fff;
      padding: 0px;
      height: 35px;
      width: 35px;
      ${TransitionMixin(".25s")}

      &:active,
      &:focus {
        outline: 0;
      }

      &:hover {
        background-color: #000;

        svg {
          stroke: #fff;
        }
      }

      svg {
        padding: 0;
        position: relative;
        top: 2px;
        right: 0px;
        stroke-width: 1px;
        height: 28px;
        width: 28px;
        ${TransitionMixin(".25s")}
      }

      &.prev-arrow {
        margin-right: 15px;
        ${media.medium`margin-right: 0px; margin-bottom: 20px;`}
      }
      &.disabled {
        opacity: 0.5;
      }
    }
  }
`;

const MobileSliderContainer = styled.div``;

const HomePageProductSlider = ({ products, reverse }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  // mobile first,
  const [isSliderMobile, setIsSliderMobile] = useState(true);
  const sliderEl = useRef(null);

  var settings = {
    dots: false,
    fade: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setSlideIndex(next),
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: "unslick",
      },
    ],
  };

  function checkWindowSize() {
    // console.log(window.innerWidth);
    if (window.innerWidth < 1026) {
      setIsSliderMobile(true);
    } else {
      setIsSliderMobile(false);
    }
    return;
  }

  useEffect(() => {
    // check inital size
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  let ht;

  return (
    <SliderContainer className={reverse === true ? "flipped" : ""}>
      <Wrapper className="slider-grid" flex>
        <div className="content-container">
          <div className="inner-wrap">
            {reverse === true ? (
              <>
                <div className="title-with-link">
                  <h1>Accessories</h1>
                  <Link to="/collections/logos-accessories">View All</Link>
                </div>
              </>
            ) : (
              <h1>
                New <br />
                Arrivals
              </h1>
            )}
          </div>
        </div>
        <div className="product-slider-container">
          <div className="inner-wrap">
            {isSliderMobile === true ? (
              <MobileSliderContainer>
                {products.slice(0, 4).map((product, index) => {
                  return (
                    <SlideContainer key={index}>
                      <ProductGridItem product={product} />
                    </SlideContainer>
                  );
                })}
              </MobileSliderContainer>
            ) : (
              <Slider ref={sliderEl} {...settings} style={{ marginBottom: 0 }}>
                {products.map((product, index) => {
                  return (
                    <SlideContainer key={index}>
                      <ProductGridItem product={product} />
                    </SlideContainer>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
        {products.length > 3 && (
          <div className="slick-arrows-container">
            <div className="inner-wrap">
              <button
                className={
                  slideIndex === 0 ? "disabled prev-arrow" : "prev-arrow"
                }
                onClick={() => sliderEl.current.slickGoTo(slideIndex - 1)}
              >
                <LeftArrow />
              </button>
              <button
                className={
                  slideIndex === products.length - 3
                    ? "disabled next-arrow"
                    : "next-arrow"
                }
                onClick={() => sliderEl.current.slickGoTo(slideIndex + 1)}
              >
                <RightArrow />
              </button>
            </div>
          </div>
        )}
      </Wrapper>
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

export default HomePageProductSlider;
