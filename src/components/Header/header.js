import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useContext, useRef, useState } from "react";
import { useTransition } from "react-spring";

import Wrapper from "../org/Wrapper";

import TopBar from "./top-bar";
import styled from "styled-components";
import Logo from "../../images/logo.inline.svg";
import Search from "../../images/search.inline.svg";
import CartIcon from "../../images/cart.inline.svg";
import Cart from "./cart";
import Overlay from "./overlay";
import MegaMenu from "./mega-menu";

import { StoreContext } from "../../context/StoreContext";
import { TransitionMixin } from "../helpers";

const HeaderContainer = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  > .wrapper-container-one {
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
            font-size: 11px;
            letter-spacing: 0.1em;
            position: relative;

            &:after {
              content: " ";
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-bottom: 5px solid black;
              display: block;
              text-align: center;
              margin: 10px auto 0px;
              position: absolute;
              left: 0;
              right: 0;
              opacity: 0;
              ${TransitionMixin(".25s")}
            }

            &:hover,
            &.active {
              &::after {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
  .cart-container {
    flex: 1;
    text-align: right;
    .inner-wrap {
      button {
        background-color: transparent;
        border: none;
      }
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
  const { isCartOpen, toggleCartOpen, addProductToCart, checkout } = useContext(
    StoreContext
  );

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [megaMenuIndex, setMegaMenuIndex] = useState(-1);

  // Pass down to <MegaMenu />
  const [menuOneImageIndex, setMenuOneImageIndex] = useState(0);

  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0%, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  });
  const secondSetTransitions = useTransition(isCartOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const megaMenuTransitions = useTransition(isMegaMenuOpen, null, {
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
  });

  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function triggerMegaMenu(menu) {
    if (!isMegaMenuOpen) {
      console.log("setting", menu);
      setIsMegaMenuOpen(true);
    }

    setMegaMenuIndex(menu);
    setMenuOneImageIndex(menu == 1 ? 0 : 0);
  }

  function closeMegaMenu() {
    setMegaMenuIndex(-1);
    setIsMegaMenuOpen(false);
  }
  return (
    <div onMouseLeave={closeMegaMenu}>
      <HeaderContainer>
        <TopBar />
        <Wrapper align flex activeClass>
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
                  <Link
                    className={megaMenuIndex === 0 ? "active" : ""}
                    onMouseEnter={() => triggerMegaMenu(0)}
                    to="#"
                  >
                    Shop By
                  </Link>
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
                  <Link
                    className={megaMenuIndex === 1 ? "active" : ""}
                    onMouseEnter={() => triggerMegaMenu(1)}
                    to="#"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link to="#">Final Sale</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="cart-container">
            <div className="inner-wrap">
              <button onClick={toggleCartOpen}>
                {qty > 0 ? qty : ""}
                <CartIcon />
              </button>
            </div>
          </div>
        </Wrapper>
      </HeaderContainer>

      {transitions.map(({ item, key, props }) => {
        return item && <Cart key={key} style={props} />;
      })}

      {secondSetTransitions.map(({ item, key, props }) => {
        return item && <Overlay key={key} style={props} />;
      })}
      {megaMenuTransitions.map(({ item, key, props }) => {
        return (
          item && (
            <MegaMenu
              megaMenuIndex={megaMenuIndex}
              setMenuOneImageIndex={setMenuOneImageIndex}
              menuOneImageIndex={menuOneImageIndex}
              key={key}
              style={props}
            />
          )
        );
      })}
    </div>
  );
};

export default Header;
