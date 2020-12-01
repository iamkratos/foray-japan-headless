import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { TransitionMixin, media } from "../helpers";
import Facebook from "../../images/facebook.inline.svg";
import Instagram from "../../images/instagram.inline.svg";
import Twitter from "../../images/twitter.inline.svg";

import Wrapper from "../org/Wrapper";

const FooterContainer = styled.footer`
  &.dark {
    background-color: #222;
    .footer-links {
      padding: 70px 0;
      display: block;
      ${media.medium`display: flex;`}

      .link-list-container {
        h4 {
          color: #fff;
        }

        ul {
          li {
            a {
              color: #fff;

              &:hover {
                opacity: 0.7;
              }
            }
          }
        }

        &.social {
          ul {
            li {
              a {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
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

const Footer = ({ dark }) => {
  return (
    <FooterContainer>
      <Wrapper flex className="footer-links">
        <div className="link-list-container">
          <div className="inner-wrap">
            <h4>Shop Collections</h4>
            <ul>
              <li>
                <Link to="/collections/queen-of-clubs">Queen of Clubs</Link>
              </li>
              <li>
                <Link to="/collections/club-quarters">Club Quarters</Link>
              </li>
              <li>
                <Link to="/collections/frosted-floom">Frosted Floom</Link>
              </li>
              <li>
                <Link to="/collections/ditsy-blitz">Ditsy Blitz</Link>
              </li>
              <li>
                <Link to="/collections/chain-reaction">Chain Reaction</Link>
              </li>
              <li>
                <Link to="/collections/current-wave">Current Wave</Link>
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
                <Link to="/pages/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/pages/terms-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link to="/pages/faq#shipping">Shipping &amp; Exchanges</Link>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="http://returns.foraygolf.com/"
                >
                  Return Center
                </a>
              </li>
              <li>
                <Link to="/pages/sizing">Sizing</Link>
              </li>
              <li>
                <Link to="/pages/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="link-list-container">
          <div className="inner-wrap">
            <h4>More Info</h4>
            <ul>
              <li>
                <Link to="/pages/press">Press</Link>
              </li>
              <li>
                <Link to="/pages/friends-of-foray">Friends of Foray</Link>
              </li>
              <li>
                <Link to="/blogs/teamforaygolf">TeamForayGolf</Link>
              </li>
              <li>
                <Link to="/pages/corporate">Corporate &amp; Wholesale</Link>
              </li>
              <li>
                <a href="mailto:contact@foraygolf.com">Contact Us</a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://wholesale.foraygolf.com/"
                >
                  B2B Partner Login
                </a>
              </li>
              <li>
                <Link to="/accounts">Account</Link>
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
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/foraygolfusa/"
                >
                  <Instagram />
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/FORAYGOLF"
                >
                  <Facebook />
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
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
