import React from "react";
import styled from "styled-components";
import { TransitionMixin } from "../helpers";

const LayoutContainer = styled.div`
  .color-container {
    .colors {
      list-style: none;
      padding: 5px 0 0;
      margin: 0px;
      text-align: right;

      li {
        display: inline-block;
        margin-right: 5px;
        .color-btn-container {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          border: 1px solid #000;
          ${TransitionMixin(".25s")}
          &.black {
            background-color: #000;
          }
          &.berry {
            background-color: #781327;
          }
          &.grey.chambray {
            background-color: #928ca1;
          }

          &.blue.chambray {
            background-color: #5b87c9;
          }
          &.eggplant {
            background-color: #b55580 !important;
          }
          &.army {
            background-color: #65825f !important;
          }

          &.military.green {
            background-color: #65825f !important;
          }
          &.white,
          &.marl {
            background-color: #fff;
          }
          &.navy,
          &.twilight,
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
          &.charcoal {
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

          &.baja {
            background-color: #7f7adb !important;
          }

          &.light.blue {
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
          &.amparo {
            background-color: #395bc4 !important;
          }
          &.navy.black {
            background-color: #07225f;
          }

          &.limone {
            background-color: #ffeb00;
          }
          &.pavone {
            background-color: #15dfe8;
          }

          &.ruby {
            background-color: #7b3d54;
          }
          &.rose.gold {
            background-color: #dec6be !important;
          }

          &.teal {
            background-color: teal;
          }

          &.dove {
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
`;

const LayoutStyles = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default LayoutStyles;
