import React from "react";
import styled from "styled-components";
import { TransitionMixin } from "../helpers";

const LayoutContainer = styled.div`
  /* layout */
  .main-content-container {
    margin-top: 83px;

    > main {
      min-height: 100vh;
    }
  }
  /* slick */
  .slick-prev:before,
  .slick-next:before {
    content: "";
  }
  .slick-next {
    right: 0;
    z-index: 10;
  }
  .slick-prev {
    left: auto;
    z-index: 10;
    right: 40px;
  }

  .slick-arrow {
    width: 50px;
    height: 50px;
    background-color: #fff;
    top: auto;
    bottom: 0;
    transform: none;

    svg {
      height: 30px;
      width: 30px;
      stroke: #000;
      stroke-width: 1px;
    }
  }

  /* color index */
  .color-container {
    .colors {
      list-style: none;
      padding: 0;
      margin: 0px;
      text-align: right;

      li {
        display: inline-block;
        margin: 2px;
        &:last-child {
          margin-right: 0px;
        }

        .color-btn-container {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          border: 1px solid #000;
          padding: 0px;
          -webkit-appearance: none;

          ${TransitionMixin(".25s")}
          &.black, &.black-splatter-print {
            background-color: #000;
          }
          &.nero-black {
            background-color: #000;
          }
          &.berry {
            background-color: #781327;
          }
          &.grey-chambray {
            background-color: #928ca1;
          }

          &.blue-chambray {
            background-color: #5b87c9;
          }
          &.eggplant-pink {
            background-color: #b55580 !important;
          }
          &.army-navy {
            background-color: #65825f !important;
          }

          &.military-green {
            background-color: #65825f !important;
          }
          &.white,
          &.marl {
            background-color: #fff;
          }
          &.navy,
          &.twilight,
          &.blue-black-twill,
          &.twill {
            background-color: navy;
          }
          &.grey {
            background-color: grey;
          }
          &.red {
            background-color: #c92c2f;
          }
          &.tomato {
            background-color: tomato;
          }
          &.coral {
            background-color: #fe0a43 !important;
          }
          &.white-w-navy-trim {
            background-color: #fff !important;
          }
          &.navy-w-white-trim {
            background-color: navy !important;
          }
          &.bw {
            background-image: linear-gradient(
              90deg,
              #fff 50%,
              #000 50%
            ) !important;
          }
          &.nb {
            background-image: linear-gradient(
              90deg,
              #fff 50%,
              #182d6d 50%
            ) !important;
          }
          &.papaya {
            background-color: #ffb014 !important;
          }
          &.charcoal-black {
            background-color: #383234 !important;
          }

          &.right {
            background-image: url("https://cdn.shopify.com/s/files/1/2119/7099/files/Right.jpg?6567735940946075326");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top center;
          }

          &.left {
            background-image: url("https://cdn.shopify.com/s/files/1/2119/7099/files/Left.jpg?6567735940946075326");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top center;
          }

          &.baja-blue {
            background-color: #7f7adb !important;
          }

          &.light-blue {
            background-color: #b5cfe6 !important;
          }

          &.mauve {
            background-color: #da798a;
          }

          &.peach {
            background-color: pink;
          }

          &.navy {
            background-color: #3434b1;
          }

          &.heather {
            background-color: grey;
          }
          &.bordeaux {
            background-color: #bb2819;
          }
          &.new-bordeaux {
            background-color: #a53e5f;
          }
          &.flamingo,
          &.new-mosto--flamingo--venere,
          &.venere {
            background-color: pink !important;
          }

          &.fuxia {
            background-color: #cd0345;
          }

          &.acqua {
            background-color: #aacde1;
          }
          &.rosso-red {
            background-color: #d71a2b;
          }
          &.amparo-blue {
            background-color: #395bc4 !important;
          }
          &.navy-black {
            background-color: #07225f;
          }

          &.limone {
            background-color: #ffeb00;
          }
          &.blue-pavone {
            background-color: #15dfe8;
          }

          &.ruby-wine {
            background-color: #7b3d54;
          }
          &.rose-gold {
            background-color: #dec6be !important;
          }

          &.teal {
            background-color: teal;
          }

          &.dove-grey {
            background-color: #dad5d5 !important;
          }

          &.maroon {
            background-color: maroon;
          }

          &.pink {
            background-color: pink;
          }
        }
      }
    }
  }

  /* tooltip */

  .tooltip-container {
    background-color: #3b444b;
    color: #fff;
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
    line-height: 1;
    padding: 5px 4px 3px;
    white-space: nowrap;
    z-index: 10;
    border-radius: 2px;
    letter-spacing: 0.7px;
    ${TransitionMixin(".25s")}
  }

  /* Hamburger */
  /*
   * Slider
   */

  .hamburger {
    padding: 0;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
    height: 20px;
  }
  .hamburger:hover {
    opacity: 0.7;
  }
  .hamburger.is-active:hover {
    opacity: 0.7;
  }
  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: #000;
  }

  .hamburger-box {
    width: 20px;
    height: 20px;
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }
  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 20px;
    height: 2px;
    background-color: #000;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: "";
    display: block;
  }
  .hamburger-inner::before {
    top: -8px;
  }
  .hamburger-inner::after {
    bottom: -16px;
  }

  .hamburger--slider .hamburger-inner {
    top: 2px;
  }
  .hamburger--slider .hamburger-inner::before {
    top: 8px;
    transition-property: transform, opacity;
    transition-timing-function: ease;
    transition-duration: 0.15s;
  }
  .hamburger--slider .hamburger-inner::after {
    top: 16px;
  }

  .hamburger--slider.is-active .hamburger-inner {
    transform: translate3d(0, 10px, 0) rotate(45deg);
  }
  .hamburger--slider.is-active .hamburger-inner::before {
    transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
    opacity: 0;
  }
  .hamburger--slider.is-active .hamburger-inner::after {
    transform: translate3d(0, -20px, 0) rotate(-90deg);
    top: 20px;
  }
`;

const LayoutStyles = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default LayoutStyles;
