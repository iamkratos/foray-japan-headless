import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Wrapper from "../org/Wrapper";
import TopBar from "./top-bar";
import styled from "styled-components";
import Logo from "../../images/logo.inline.svg";
import Search from "../../images/search.inline.svg";
import Cart from "../../images/cart.inline.svg";

import { StoreContext } from "../../context/StoreContext";

const HeaderContainer = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ccc;

  .wrapper-container-one {
    padding: 10px 0;
  }

  .logo-container {
    flex: 0.5;
    text-align: center;

    a {
      display: inline-block;
      svg {
        max-width: 140px;
        max-height: 65px;
      }
    }
  }
  .search-container {
    flex: 1;
    .inner-wrap {
      svg {
        height: 35px;
        width: 35px;
        stroke-width: 1px;
      }
    }
  }
  .link-container {
    flex: 0.7;
    &.left {
      text-align: right;
    }
    nav {
      ul {
        margin: 0px;
        padding: 0px;

        li {
          display: inline-block;
          margin-right: 20px;
          margin-bottom: 0px;

          &:last-child {
            margin-right: 0px;
          }

          a {
            color: #000;
            font-family: "Nexa";
            text-decoration: none;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
  .cart-container {
    flex: 1;
    text-align: right;
    .inner-wrap {
      svg {
        height: 35px;
        width: 35px;
        stroke-width: 1px;

        path {
          stroke: #000;
          fill: #000;
        }
      }
    }
  }
`;

const Header = ({ siteTitle }) => {
  const { isCartOpen, addProductToCart } = useContext(StoreContext);
  return (
    <HeaderContainer>
      <TopBar />
      <Wrapper flex activeClass>
        <div className="search-container">
          <div className="inner-wrap">
            <Search />
          </div>
        </div>
        <div className="link-container left">
          <nav>
            <ul>
              <li>
                <Link to="#">New Arrivals</Link>
              </li>
              <li>
                <Link to="#">Shop By</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="logo-container">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="link-container">
          <nav>
            <ul>
              <li>
                <Link to="#">Collections</Link>
              </li>
              <li>
                <Link to="#">Final Sale</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="cart-container">
          <div className="inner-wrap">
            <Cart />
          </div>
        </div>
      </Wrapper>
    </HeaderContainer>
  );
};

export default Header;
