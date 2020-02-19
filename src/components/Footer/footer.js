import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { TransitionMixin, media } from "../helpers";
import Facebook from "../../images/facebook.inline.svg";
import Instagram from "../../images/instagram.inline.svg";
import Twitter from "../../images/twitter.inline.svg";

import Wrapper from "../org/Wrapper";

const FooterContainer = styled.footer`
  .footer-links {
    padding: 70px 0;
    display: block;
    ${media.medium`display: flex;`}

    .link-list-container {
      flex: 1;
      display: block;
      text-align: center;
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0px;
      }
      ${media.medium`text-align: left; display: flex; justify-content: center;`}

      h4 {
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #000;
        margin-bottom: 15px;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          margin-bottom: 0.25em;
          a {
            color: #000;
            text-transform: uppercase;
            font-size: 12px;
            text-decoration: none;
            ${TransitionMixin(".25s")}

            &:hover {
              opacity: 0.7;
            }
          }
        }
      }

      &.social {
        ul {
          li {
            display: inline-block;
            margin-right: 15px;

            &:last-child {
              margin-right: 0px;
            }
          }
        }
      }
    }
  }

  .copyright {
    padding: 15px 0;
    text-align: center;
    p {
      margin: 0;
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 11px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Wrapper flex className="footer-links">
        <div className="link-list-container">
          <div className="inner-wrap">
            <h4>Shop Collections</h4>
            <ul>
              <li>
                <Link to="/collections/d-luxe">D-Luxe</Link>
              </li>
              <li>
                <Link to="/collections/winter-floom">Winter Floom</Link>
              </li>
              <li>
                <Link to="/collections/mercury-rising">Mercury Rising</Link>
              </li>
              <li>
                <Link to="/collections/sun-daze">Sun Daze</Link>
              </li>
              <li>
                <Link to="/collections/power-pleats">Power Pleats</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="link-list-container">
          <div className="inner-wrap">
            <h4>Shop By</h4>
            <ul>
              <li>
                <Link to="/collections/tops">Tops</Link>
              </li>
              <li>
                <Link to="/collections/bottoms">Bottoms</Link>
              </li>
              <li>
                <Link to="/collections/outerwear">Outerwear</Link>
              </li>
              <li>
                <Link to="/collections/dresses">Dresses</Link>
              </li>
              <li>
                <Link to="/collections/accessories">Accessories</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="link-list-container">
          <div className="inner-wrap">
            <h4>About</h4>
            <ul>
              <li>
                <Link to="/collections/tops">Who We Are</Link>
              </li>
              <li>
                <Link to="/collections/bottoms">Technology</Link>
              </li>
              <li>
                <Link to="/pages/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/collections/dresses">Terms of Use</Link>
              </li>
              <li>
                <Link to="/collections/accessories">
                  Shipping &amp; Exchanges
                </Link>
              </li>
              <li>
                <a rel="noreferrer" href="http://returns.foraygolf.com/">
                  Returns
                </a>
              </li>
              <li>
                <Link to="/pages/sizing">Sizing</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="link-list-container">
          <div className="inner-wrap">
            <h4>More Info</h4>
            <ul>
              <li>
                <Link to="/collections/tops">Press</Link>
              </li>
              <li>
                <Link to="/collections/bottoms">Friends of Foray</Link>
              </li>
              <li>
                <Link to="/collections/outerwear">TeamForayGolf</Link>
              </li>
              <li>
                <Link to="/collections/dresses">Corporate &amp; Wholesale</Link>
              </li>
              <li>
                <Link to="/collections/accessories">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="link-list-container social">
          <div className="inner-wrap">
            <h4>Follow Us</h4>
            <ul>
              <li>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/foraygolfusa/"
                >
                  <Instagram />
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/FORAYGOLF"
                >
                  <Facebook />
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://twitter.com/foraygolf"
                >
                  <Twitter />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Wrapper>
      <Wrapper className="fw black copyright">
        <Wrapper>
          <p>
            Copyright © {new Date().getFullYear()} FORAY GOLF, LLC. All Rights
            Reserved.
          </p>
        </Wrapper>
      </Wrapper>
    </FooterContainer>
  );
};

export default Footer;
