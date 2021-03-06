import React from "react";
import styled from "styled-components";
import { TransitionMixin, media } from "../helpers";

const ProductGridItemContainer = styled.div`
  flex: 1 1 100%;
  margin-bottom: 40px;

  ${media.medium`flex: 0 0 20%;`}

  > .inner-wrap {
    max-width: 90%;
    margin: 0 auto;
  }
  .image-container {
    position: relative;
    max-height: 460px;
    overflow-y: hidden;

    &.glove {
      max-height: 520px;
    }

    ${media.medium`max-height: 100%;`}

    .image-1 {
      position: absolute !important;
      width: 100%;
      height: 100%;
      top: 0;
      opacity: 0;
      ${TransitionMixin(".25s")}

      &.fade-in {
        opacity: 1;
      }
    }

    &:hover {
      .quick-shop-container {
        .inner-wrap {
          opacity: 1;
        }
      }
    }

    .quick-shop-container {
      position: absolute;
      z-index: 200;
      bottom: 20px;
      left: 0;
      width: 100%;
      text-align: center;
      .inner-wrap {
        background-color: #fff;
        max-width: 300px;
        margin: 0 auto;
        padding: 10px 0;
        border: 1px solid #000;
        border-radius: 4px;
        line-height: 1;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        ${media.medium`opacity: 0;`}
        ${TransitionMixin(".25s")}
        .quick-shop-text, .view-dress {
          font-size: 13px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0px;
          color: #000;
          border: none;
          font-weight: bold;
          -webkit-appearance: none;
          background-color: #fff;

          &.hide {
            display: none;
          }
        }
        ul {
          &.sizes {
            display: none;
            margin: 0px;

            &.show {
              display: block;
            }
          }
          li {
            display: inline-block;
            margin-bottom: 0px;
            margin-right: 5px;
            &:last-child {
              margin-right: 0px;
            }
            button {
              font-size: 11px;
              font-weight: bold;
              border: 1px solid #000;
              padding: 5px 5px 3px;
              background-color: transparent;
              line-height: 1;
              color: #000;
              position: relative;
              ${TransitionMixin(".25s")}

              &.disabled {
                opacity: 0.5;
                position: relative;
                /* &::after {
                  content: " ";
                  border-top: 1px solid #000;
                  transform: rotate(-45deg);
                  position: absolute;
                  width: 100%;
                  right: 0;
                  top: 9px;
                } */

                svg {
                  display: block;
                }
                &:hover {
                  opacity: 0.5;
                  cursor: not-allowed;
                  color: #000;
                  background-color: #fff;
                }
              }
              &:hover {
                color: #fff;
                background-color: #000;
                cursor: pointer;
              }
              svg {
                width: 100%;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                stroke-width: 2px;
                display: none;
                stroke: #000;

                line {
                  &:nth-child(2) {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .info-container {
    padding: 20px 0 10px;

    > .inner-wrap {
      display: flex;

      .title-container {
        flex: 1.5;
        text-align: left;
        h4 {
          font-size: 13px;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 0px;
        }
        p {
          font-weight: bold;
          font-size: 13px;
          color: #777;
          margin-bottom: 0px;

          span {
            opacity: 0.5;
            position: relative;
            margin-right: 5px;

            &::after {
              content: " ";
              position: absolute;
              top: 5.5px;
              left: 0;
              width: 100%;
              background: #777;
              height: 1px;
            }
          }
        }
      }
      .color-container {
        flex: 1;

        .colors {
          text-align: right;
          li {
            position: relative;
            margin-bottom: 0px;

            &:hover {
              .tooltip-container {
                opacity: 1;
              }
            }
            button {
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
              }
              &:focus,
              &:visited {
                transform: scale(1.1);
                outline: 0;
              }
            }
          }
        }
      }
    }
  }
`;

const ProductStyles = ({ children }) => {
  return <ProductGridItemContainer>{children}</ProductGridItemContainer>;
};

export default ProductStyles;
