import { Link } from "gatsby";
import React, { useContext, useState, useEffect } from "react";
import { useTransition } from "react-spring";
import { window } from "browser-monads";

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


  &.shrink {
    &.instagram-styles {
      top: 40px;
    }
    .logo-container {
      a {
        ${media.medium`max-height: 30px;position: relative;overflow: hidden;`}

        svg {
          ${media.medium`transform: translate3d(0px, -37px, 0px);`}
          path {
            &.hide-on-shrink {
              ${media.medium`opacity: 0;`}
            }
          }
        }
      }
    }
    .link-container {
      nav {
        ul {
          li {
            a {
              &::after {
                ${media.medium`margin: 0px auto 0px;`}
              }
            }
          }
        }
      }
    }
  }

  > .wrapper-container-one {
    padding: 10px 0;
  }

  .logo-container {
    flex: 0.5;
    text-align: center;

    a {
      display: inline-block;
      max-height: 65px;
      svg {
        ${TransitionMixin(".25s")}
        max-width: 120px;
        max-height: 55px;

        ${media.medium`max-width: 140px;max-height: 65px;`}
      }
    }
  }
  .search-container {
    flex: 1;
    ${media.small`flex: 1;`}
    ${media.medium`flex: .5;`}
    ${media.large`flex: .7;`}
    ${media.laptop`flex: 1;`}
    .inner-wrap {
      display: flex;
      align-items: center;
      button {
        background-color: transparent;
        border: none;
        &:active,
        &:focus {
          outline: 0;
        }
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

            &.sale {
              color: red;
              font-weight: bold !important;
              font-size: 14px !important;
            }

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
    text-align: right;
    flex: 1;
    ${media.small`flex: 1;`}
    ${media.medium`flex: .5;`}
    ${media.large`flex: .7;`}
    ${media.laptop`flex: 1;`}
    .inner-wrap {
      button {
        background-color: transparent;
        border: none;
        height: 40px;
        position: relative;
      }

      sup {
        position: absolute;
        bottom: 17px;
        left: 0;
        font-weight: bold;
        font-size: 12px;
        width: 100%;
        text-align: center;
        top: auto;
        ${media.medium`bottom: 15px;`}
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

  const [isMenuShrunk, setIsMenuShrunk] = useState(false);
  const [isInstagramBrowser, setIsInstagramBrowser] = useState(false);

  // Pass down to <MegaMenu />
  const [menuOneImageIndex, setMenuOneImageIndex] = useState(0);

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

  const qty =
    checkout &&
    checkout.lineItems.reduce((total, item) => {
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

  useEffect(() => {
    if (window.navigator.userAgent.match(/instagram/i)) {
      // here apply the fixes
      setIsInstagramBrowser(true);
    }

    window.addEventListener("scroll", function() {
      if (window.scrollY > 70) {
        setIsMenuShrunk(true);
      } else {
        setIsMenuShrunk(false);
      }
      return;
    });

    return () => {
      // clean up
      window.removeEventListener("scroll", function() {
        return;
      });
    };
  }, []);
  return (
    <div role="group" onMouseLeave={closeMegaMenu}>
      {/* <div role="group"></div> */}
      <HeaderContainer
        className={
          (isMenuShrunk === true ? "shrink " : "") ||
          (isInstagramBrowser === true ? "instagram-styles" : "")
        }
      >
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
                  <Link to="/collections/the-oddyesey">New Arrivals</Link>
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
                  <a className="sale" href="/collections/final-sale">
                    Final Sale
                  </a>
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
        return (
          item && (
            <MobileMenu
              isMenuShrunk={isMenuShrunk}
              isInstagramBrowser={isInstagramBrowser}
              key={key}
              style={props}
            />
          )
        );
      })}

      {transitions.map(({ item, key, props }) => {
        return item && <Cart key={key} style={props} />;
      })}

      {searchTransitions.map(({ item, key, props }) => {
        return (
          item && (
            <Search
              key={key}
              style={props}
              isMenuShrunk={isMenuShrunk}
              isSearchOpen={isSearchOpen}
            />
          )
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
              isMenuShrunk={isMenuShrunk}
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
