import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { animated } from "react-spring";
import ChevronRight from "../../images/chevron-right.inline.svg";
import { TransitionMixin } from "../helpers";

import Wrapper from "../org/Wrapper";
const MobileMenuContainer = styled(animated.div)`
  position: fixed;
  left: 0;
  width: 100%;
  background-color: #fff;
  top: 83px;
  z-index: 400;
  min-height: calc(100vh - 83px);
  max-height: calc(100vh - 83px);
  overflow-y: scroll;
  padding-bottom: 20px;

  p {
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 11px;
  }

  > ul {
    padding: 20px 0 0;
    margin: 0;
    list-style: none;
    > li {
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      padding-bottom: 20px;

      a {
        color: #000;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;
        display: flex;
        align-items: center;

        span {
          position: relative;
          top: 2px;
          flex: 1;
          text-align: right;

          svg {
            ${TransitionMixin(".25s")}

            &.active {
              transform: rotate(90deg);
            }
          }
        }
      }

      ul {
        padding: 0px 0 0px 20px;
        margin: 0px;
        list-style: none;
        max-height: 0px;
        overflow: hidden;
        ${TransitionMixin(".25s")}

        &.active {
          max-height: 1000px;
        }
        li {
          margin-bottom: 10px;
          &:first-child {
            padding-top: 10px;
          }
          &:last-child {
            padding-bottom: 10px;
          }
          a {
            font-size: 13px;
            color: #777;

            &:active,
            &:focus {
              color: #000;
            }
          }
        }
      }
    }
  }
`;

const MobileMenu = ({ style }) => {
  const [dropdownIndex, setDropdownIndex] = useState(-1);
  const collectionLinks = [
    {
      title: "Graphic Floral",
      url: "/collections/graphic-floral-collection",
    },
    {
      title: "D-Luxe",
      url: "/collections/d-luxe",
    },
    {
      title: "Winter Floom",
      url: "/collections/winter-floom",
    },
    {
      title: "Mercury Rising",
      url: "/collections/mercury-rising",
    },
    {
      title: "Sun Daze",
      url: "/collections/sun-daze",
    },
    {
      title: "America",
      url: "/collections/america",
    },
    {
      title: "Core 2.0",
      url: "/collections/core-2-0-collection",
    },
    {
      title: "Lace Escape",
      url: "/collections/lace-escape",
    },
    {
      title: "Floom Official",
      url: "/collections/floom-official",
    },
    {
      title: "Rockstud",
      url: "/collections/rockstud",
    },
    {
      title: "View All",
      url: "/collections/all",
    },
  ];
  const shopByLinks = [
    {
      title: "Tops",
      url: "/collections/tops",
    },
    {
      title: "Bottoms",
      url: "/collections/bottoms",
    },
    {
      title: "Outerwear",
      url: "/collections/outerwear",
    },
    {
      title: "Dresses",
      url: "/collections/dresses",
    },
    {
      title: "Kids",
      url: "/collections/kids",
    },
    {
      title: "Accessories",
      url: "/collections/accessories",
    },
    {
      title: "View All",
      url: "/collections/all",
    },
  ];

  function handleDropdownIndex(linkIndex) {
    //   if theyre the same, close all dropdowns
    if (linkIndex === dropdownIndex) {
      setDropdownIndex(-1);
    } else {
      setDropdownIndex(linkIndex);
    }
  }

  return (
    <MobileMenuContainer style={{ ...style }}>
      <ul>
        <li>
          <Wrapper>
            <Link to="/collections/dream-weaver">
              New Arrivals
              <span>
                <ChevronRight />
              </span>
            </Link>
          </Wrapper>
        </li>
        <li className="has-children">
          <Wrapper>
            <a href="#" onClick={() => handleDropdownIndex(0)}>
              Shop By{" "}
              <span>
                <ChevronRight className={dropdownIndex === 0 ? "active" : ""} />
              </span>
            </a>
            <ul className={dropdownIndex === 0 ? "active" : ""}>
              {shopByLinks.map((link, index) => (
                <li key={index}>
                  <Wrapper>
                    <Link to={link.url}>{link.title}</Link>
                  </Wrapper>
                </li>
              ))}
            </ul>
          </Wrapper>
        </li>
        <li className="has-children">
          <Wrapper>
            <a href="#" onClick={() => handleDropdownIndex(1)}>
              Collections{" "}
              <span>
                <ChevronRight className={dropdownIndex === 1 ? "active" : ""} />
              </span>
            </a>
            <ul className={dropdownIndex === 1 ? "active" : ""}>
              {collectionLinks.map((link, index) => (
                <li key={index}>
                  <Wrapper>
                    <Link to={link.url}>{link.title}</Link>
                  </Wrapper>
                </li>
              ))}
            </ul>
          </Wrapper>
        </li>
        <li>
          <Wrapper>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/foraygolfusa/"
            >
              #TeamForayGolf
              <span>
                <ChevronRight />
              </span>
            </a>
          </Wrapper>
        </li>
      </ul>
      <p>&copy; {new Date().getFullYear()} Foray Golf. All Rights Reserved.</p>
    </MobileMenuContainer>
  );
};

export default MobileMenu;
