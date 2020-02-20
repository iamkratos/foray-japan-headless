import { Link } from "gatsby";
import React, { useContext, useState, useRef } from "react";
import { useTransition } from "react-spring";

import Wrapper from "../org/Wrapper";

import TopBar from "./top-bar";
import styled from "styled-components";
import Logo from "../../images/logo.inline.svg";
import SearchIcon from "../../images/search.inline.svg";
import CartIcon from "../../images/cart.inline.svg";
import Cart from "./cart";
import Overlay from "./overlay";
import SearchOverlay from "./search-overlay";
import MegaMenu from "./mega-menu";
import MobileMenu from "./mobile-menu";

import { StoreContext } from "../../context/StoreContext";
import { TransitionMixin, media } from "../helpers";

import Search from "../Search/search";

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
        max-width: 120px;
        max-height: 55px;
        ${media.medium`max-width: 140px;max-height: 65px;`}
      }
    }
  }
  .search-container {
    flex: 1;
    .inner-wrap {
      display: flex;
      align-items: center;
      button {
        background-color: transparent;
        border: none;
        svg {
          height: 25px;
          width: 25px;
          top: 3px;
          position: relative;
          stroke-width: 1px;
          ${media.medium`height: 35px; width: 35px; top: 0px;`}
        }

        &.hamburger {
          ${media.medium`display: none;`}
        }
      }
    }
  }
  .link-container {
    flex: 1;
    display: none;
    ${media.medium`display: block;`}
    ${media.large`flex: 0.7;`}
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
        height: 30px;
        position: relative;
      }

      sup {
        position: absolute;
        bottom: 8px;
        left: 0;
        font-weight: bold;
        font-size: 12px;
        width: 100%;
        text-align: center;
        top: auto;
        ${media.medium`bottom: 5px;`}
      }

      svg {
        height: 30px;
        width: 30px;
        stroke-width: 1px;
        ${media.medium`height: 35px; width: 35px;`}

        path {
          stroke: #000;
          fill: #000;
        }
      }
    }
  }
`;

const Header = ({ siteTitle }) => {
  const { isCartOpen, toggleCartOpen, checkout } = useContext(StoreContext);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [megaMenuIndex, setMegaMenuIndex] = useState(-1);

  // Pass down to <MegaMenu />
  const [menuOneImageIndex, setMenuOneImageIndex] = useState(0);

  const inputEl = useRef(null);

  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0%, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  });

  const moibleMenutransitions = useTransition(isMobileMenuOpen, null, {
    from: { transform: "translate3d(-100%, 0, 0)" },
    enter: { transform: "translate3d(-0%, 0, 0)" },
    leave: { transform: "translate3d(-100%, 0, 0)" },
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

  const searchTransitions = useTransition(isSearchOpen, null, {
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
  });

  const searchOverlayTransitions = useTransition(isSearchOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function triggerMegaMenu(menu) {
    if (!isMegaMenuOpen) {
      setIsMegaMenuOpen(true);
      setIsSearchOpen(false);
    }

    setMegaMenuIndex(menu);
    setMenuOneImageIndex(menu === 1 ? 0 : 0);
  }

  function closeMegaMenu() {
    setMegaMenuIndex(-1);
    setIsMegaMenuOpen(false);
  }

  function handleCartOpen() {
    toggleCartOpen();
    closeMegaMenu();
  }

  function handleSearchToggle() {
    if (isSearchOpen === false) {
      setIsSearchOpen(true);
      closeMegaMenu();
    } else {
      setIsSearchOpen(false);
    }
  }
  return (
    <div role="group" onMouseLeave={closeMegaMenu}>
      <HeaderContainer>
        <TopBar />
        <Wrapper align flex activeClass>
          <div className="search-container">
            <div className="inner-wrap">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={
                  isMobileMenuOpen
                    ? "hamburger hamburger--slider is-active"
                    : "hamburger hamburger--slider"
                }
              >
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </button>
              <button onClick={() => handleSearchToggle()}>
                <SearchIcon />
              </button>
            </div>
          </div>
          <div className="link-container left">
            <nav>
              <ul>
                <li>
                  <Link to="/collections/graphic-floral-collection">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <a
                    className={megaMenuIndex === 0 ? "active" : ""}
                    onMouseEnter={() => triggerMegaMenu(0)}
                    href="#"
                  >
                    Shop By
                  </a>
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
                  <a
                    className={megaMenuIndex === 1 ? "active" : ""}
                    onMouseEnter={() => triggerMegaMenu(1)}
                    href="#"
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#">Final Sale</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="cart-container">
            <div className="inner-wrap">
              <button onClick={handleCartOpen}>
                <sup>{qty > 0 ? qty : ""}</sup>
                <CartIcon />
              </button>
            </div>
          </div>
        </Wrapper>
      </HeaderContainer>

      {moibleMenutransitions.map(({ item, key, props }) => {
        return item && <MobileMenu key={key} style={props} />;
      })}

      {transitions.map(({ item, key, props }) => {
        return item && <Cart key={key} style={props} />;
      })}

      {searchTransitions.map(({ item, key, props }) => {
        return (
          item && <Search key={key} style={props} isSearchOpen={isSearchOpen} />
        );
      })}

      {searchOverlayTransitions.map(({ item, key, props }) => {
        return (
          item && (
            <SearchOverlay
              setIsSearchOpen={setIsSearchOpen}
              key={key}
              style={props}
            />
          )
        );
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
