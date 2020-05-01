import React, { useState, useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ProductGridItem from "../../components/Product/product-grid-item";
import Wrapper from "../org/Wrapper";

// Slick
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

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
  .slider-grid {
    flex-wrap: nowrap;
    display: block;
    ${media.medium`display: flex;`}
    .content-container {
      flex: 1;
      .inner-wrap {
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

    ${media.medium`top: 0; right: -20px;margin: 19vh 0 0;`}

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

const HomePageProductSlider = ({ products }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
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
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <SliderContainer>
      <Wrapper className="slider-grid" flex>
        <div className="content-container">
          <div className="inner-wrap">
            <h1>
              New {""}
              <br />
              Arrivals
            </h1>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              molestias voluptatem delectus voluptates quam quia aliquid unde
              nam explicabo, sapiente, voluptate eos accusamus qui ducimus odit
              quasi labore? Nisi, obcaecati?
            </p> */}
          </div>
        </div>
        <div className="product-slider-container">
          <div className="inner-wrap">
            <Slider ref={sliderEl} {...settings} style={{ marginBottom: 0 }}>
              {products.map((product, index) => {
                return (
                  <SlideContainer key={index}>
                    <ProductGridItem product={product} />
                  </SlideContainer>
                );
              })}
            </Slider>
          </div>
        </div>

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
