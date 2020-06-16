import React from "react";
import styled from "styled-components";
import { TransitionMixin, media } from "../helpers";

const FilterContainer = styled.div`
  flex: 1;
  position: fixed;
  left: 0;
  top: calc(100% - 50px);
  width: 100%;
  z-index: 900;
  background-color: #fff;
  transform: translate3d(0px, 0%, 0px);
  height: 80vh;
  ${TransitionMixin(".25s")}
  ${media.medium`z-index: 100; position: static; height: 100%; `}

&.active {
    transform: translate3d(0px, -60%, 0px);
  }

  > .inner-wrap {
    max-width: 90vw;
    margin: 0 auto;

    .scroll-container {
      max-height: 44vh;
      overflow-y: scroll;
      margin-top: 10px;
      padding-bottom: 10px;

      ${media.medium`max-height: 100%; overflow-y: initial;margin-top: 0px;padding-bottom: 0px;`}
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #000000;
        /* border: 2px solid #555555; */
      }
    }
  }

  .filter-mobile-trigger {
    height: 50px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media.medium`display: none;`}

    button {
      color: #fff;
      font-weight: bold;
      width: 100%;
      height: 100%;
      -webkit-appearance: none;
      background-color: #000;
    }
  }

  .color-container {
    .colors {
      display: flex;
      flex-wrap: wrap;
      ${media.medium`margin-left: -6px;`}
    }
  }

  .current-filter {
    margin-bottom: 40px;
    .title-container {
      padding: 20px 0 0;
      ${media.medium`padding: 0;`}
      h1 {
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 0 20px;
        padding-bottom: 5px;
        border-bottom: 2px solid #ccc;
        display: inline-block;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: inline-block;
        margin-right: 5px;
      }
    }
    button {
      display: block;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 11px;
      border: none;
      box-shadow: none;
      padding: 0px;
      color: #000;
      background-color: #fff;
      border: 1px solid #000;
      padding: 6px 10px 5px;
      border-radius: 4px;
      line-height: 1;
      display: flex;
      align-items: center;

      svg {
        stroke: #777;
        height: 13px;
        width: 13px;
        margin-left: 5px;
      }

      &.clear {
        color: #fff;
        background-color: #000;
      }
    }
  }

  .filter-title {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .color-filter-container {
    margin-bottom: 10px;

    ${media.medium`margin-bottom: 50px;`}
  }

  .size-filter-container {
    .size-container {
      .sizes {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0px;
        ${media.medium`margin: 0 0 0 -6px;`}

        li {
          list-style: none;
          margin: 2px 4px;
          ${media.xxl`margin: 2px 5px;`}

          &.size-xxs {
            order: 1;
          }

          &.size-xs {
            order: 2;
          }

          &.size-s {
            order: 3;
          }

          &.size-m {
            order: 4;
          }

          &.size-l {
            order: 5;
          }
          &.size-xl {
            order: 6;
          }
          &.size-xxl {
            order: 6;
          }
          &.size-0 {
            order: 7;
          }
          &.size-2 {
            order: 8;
          }
          &.size-4 {
            order: 9;
          }
          &.size-6 {
            order: 10;
          }
          &.size-8 {
            order: 11;
          }
          &.size-10 {
            order: 12;
          }
          &.size-12 {
            order: 13;
          }
          &.size-14 {
            order: 14;
          }
          &.size-xs-s {
            order: 15;
          }
          &.size-m-l {
            order: 16;
          }
          &.size-os {
            order: 17;
          }
          &.size-o-s {
            order: 18;
          }
          &.size-2-3-y {
            order: 19;
          }
          &.size-4-5-y {
            order: 20;
          }
          &.size-6-7-y {
            order: 21;
          }
          &.size-8-9-y {
            order: 22;
          }
          button {
            border: 1px solid #000;
            padding: 0px;
            font-weight: bold;
            font-size: 12px;
            line-height: 1;
            padding: 5px;
            min-width: 64px;
            background-color: #fff;
            -webkit-appearance: none;
            ${TransitionMixin(".25s")}
            ${media.xl`min-width: 82px;`}

          &.active, &:hover {
              background-color: #000;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .tags-container {
    margin-top: 50px;
    .features-container {
      .features {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0px;
        list-style: none;
        ${media.medium`margin: 0 0 0 -6px;`}
        li {
          margin: 2px 5px 7px;
          flex: 0 0 45%;

          button {
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
            font-size: 10px;
            border: 1px solid #000;
            background-color: transparent;
            border-radius: 24px;
            line-height: 1;
            padding: 6px 5px 5px;
            width: 100%;
            ${TransitionMixin(".25s")}

            &.active,
          &:hover {
              background-color: #000;
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

const FilterStyles = ({ className, children }) => {
  return <FilterContainer className={className}>{children}</FilterContainer>;
};

export default FilterStyles;
