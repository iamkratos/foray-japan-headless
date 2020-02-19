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
import { media } from "../helpers";

// Slider Container

const SlideContainer = styled.div``;
const SliderContainer = styled.div`
  padding-top: 30px;
  .slider-grid {
    flex-wrap: nowrap;
    .content-container {
      flex: 1;
      .inner-wrap {
        h1 {
          margin: 20% 0 0;
          font-size: 40px;
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
              > .inner-wrap {
                max-width: 90%;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
  }
  .slick-arrows-container {
    margin: 19vh 0 0;
    position: relative;
    right: -20px;
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

      svg {
        padding: 0;
        position: relative;
        top: 2px;
        right: 0px;
        stroke-width: 1px;
        height: 28px;
        width: 28px;
      }

      &.prev-arrow {
        margin-bottom: 20px;
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
  };
  return (
    <SliderContainer>
      <Wrapper className="slider-grid" flex>
        <div className="content-container">
          <div className="inner-wrap">
            <h1>
              New
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
              {products.map(product => {
                return (
                  <SlideContainer>
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
