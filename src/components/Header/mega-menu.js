import React, { useRef } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import { TransitionMixin, media } from "../helpers";
import { animated } from "react-spring";

import Wrapper from "../org/Wrapper";

const MegaMenuContainer = styled(animated.div)`
  position: fixed;
  width: 100%;
  top: 83px;
  left: 0;
  background-color: #fff;
  min-height: 368px;
  z-index: 400;
  border-bottom: 1px solid #efefef;

  .linklist-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .list-container {
      display: flex;

      ul {
        &:first-child {
          margin-right: 40px;

          li {
            &:last-child {
              a {
                font-weight: normal;
              }
            }
          }
        }
      }
    }
    h4 {
      text-transform: uppercase;
      font-size: 14px;
      margin-bottom: 10px;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        margin-bottom: 0px;
        &:last-child {
          a {
            font-weight: bold;
          }
        }
        a {
          line-height: 1;
          color: #000;
          text-transform: uppercase;
          text-decoration: none;
          color: #000;
          font-size: 11px;
          ${TransitionMixin(".25s")}

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
  }
  .image-container {
    flex: 1;
    position: relative;
    min-height: 368px;
    ${media.xl`min-height: 468px;`}
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  overflow: hidden;
  ${TransitionMixin(".25s")}
  &.fade-in {
    opacity: 1;
  }
`;

const MegaMenu = ({
  megaMenuIndex,
  menuOneImageIndex,
  setMenuOneImageIndex,
  style,
}) => {
  const data = useStaticQuery(graphql`
    query {
      topsImage: file(relativePath: { eq: "menu-items/shop-by/tops.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      bottomsImage: file(
        relativePath: { eq: "menu-items/shop-by/bottoms.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      outerwearImage: file(
        relativePath: { eq: "menu-items/shop-by/outerwear.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dressesImage: file(
        relativePath: { eq: "menu-items/shop-by/dresses.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      kidsImage: file(relativePath: { eq: "menu-items/shop-by/kids.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      accessoriesImage: file(
        relativePath: { eq: "menu-items/shop-by/accessories.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      viewAllImage: file(
        relativePath: { eq: "menu-items/shop-by/viewall.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      # Collections
      graphicFloral: file(
        relativePath: { eq: "menu-items/collections/graphic-floral-new.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dluxe: file(relativePath: { eq: "menu-items/collections/d-luxe.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      winterFloom: file(
        relativePath: { eq: "menu-items/collections/winter-floom.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mercuryRising: file(
        relativePath: { eq: "menu-items/collections/mercury-rising.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sunDaze: file(
        relativePath: { eq: "menu-items/collections/sun-daze.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      powerPleats: file(
        relativePath: { eq: "menu-items/collections/power-pleats.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      america: file(
        relativePath: { eq: "menu-items/collections/america.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      core: file(relativePath: { eq: "menu-items/collections/core.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      laceEscape: file(
        relativePath: { eq: "menu-items/collections/lace-escape.jpeg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      floomOfficial: file(
        relativePath: { eq: "menu-items/collections/floom.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rockstud: file(
        relativePath: { eq: "menu-items/collections/rockstud.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  console.log("data!", data);
  const collectionLinks = [
    {
      title: "Graphic Floral",
      url: "/collections/graphic-floral-collection",
      image: data.graphicFloral.childImageSharp.fluid,
    },
    {
      title: "D-Luxe",
      url: "/collections/d-luxe",
      image: data.dluxe.childImageSharp.fluid,
    },
    {
      title: "Winter Floom",
      url: "/collections/winter-floom",
      image: data.winterFloom.childImageSharp.fluid,
    },
    {
      title: "Mercury Rising",
      url: "/collections/mercury-rising",
      image: data.mercuryRising.childImageSharp.fluid,
    },
    {
      title: "Sun Daze",
      url: "/collections/sun-daze",
      image: data.sunDaze.childImageSharp.fluid,
    },
    {
      title: "Power Pleats",
      url: "/collections/power-pleats",
      image: data.powerPleats.childImageSharp.fluid,
    },
    {
      title: "America",
      url: "/collections/america",
      image: data.america.childImageSharp.fluid,
    },
    {
      title: "Core 2.0",
      url: "/collections/core-2-0-collection",
      image: data.core.childImageSharp.fluid,
    },
    {
      title: "Lace Escape",
      url: "/collections/lace-escape",
      image: data.laceEscape.childImageSharp.fluid,
    },
    {
      title: "Floom Official",
      url: "/collections/floom-official",
      image: data.floomOfficial.childImageSharp.fluid,
    },
    {
      title: "Rockstud",
      url: "/collections/rockstud",
      image: data.rockstud.childImageSharp.fluid,
    },
    {
      title: "View All",
      url: "/collections/all",
      image: data.viewAllImage.childImageSharp.fluid,
    },
  ];
  const shopByLinks = [
    {
      title: "Tops",
      url: "/collections/tops",
      image: data.topsImage.childImageSharp.fluid,
    },
    {
      title: "Bottoms",
      url: "/collections/bottoms",
      image: data.bottomsImage.childImageSharp.fluid,
    },
    {
      title: "Outerwear",
      url: "/collections/outerwear",
      image: data.outerwearImage.childImageSharp.fluid,
    },
    {
      title: "Dresses",
      url: "/collections/dresses",
      image: data.dressesImage.childImageSharp.fluid,
    },
    {
      title: "Kids",
      url: "/collections/kids",
      image: data.kidsImage.childImageSharp.fluid,
    },
    {
      title: "Accessories",
      url: "/collections/accessories",
      image: data.accessoriesImage.childImageSharp.fluid,
    },
    {
      title: "View All",
      url: "/collections/all",
      image: data.viewAllImage.childImageSharp.fluid,
    },
  ];

  const mainMenuImage = useRef(null);

  function handleMenuItemHover(menuIndex) {
    // console.log(menuItem);
    setMenuOneImageIndex(menuIndex);
  }

  console.log("mm index is", megaMenuIndex);
  let hideMenuOne = megaMenuIndex === 0 ? "" : "hide";
  let hideMenuTwo = megaMenuIndex === 1 ? "" : "hide";
  return (
    <MegaMenuContainer style={{ ...style }}>
      {/* Shop By */}
      <Wrapper flex activeClass shiftRight className={hideMenuOne}>
        <div className="linklist-container">
          <div className="inner-wrap">
            <h4>Shop By</h4>
            <ul>
              {shopByLinks.map((link, index) => (
                <li>
                  <Link
                    onMouseEnter={() => handleMenuItemHover(index)}
                    to={link.url}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="image-container">
          {shopByLinks.map((link, index) => {
            if (link.image != null) {
              return (
                <ImageContainer
                  ref={mainMenuImage}
                  className={
                    menuOneImageIndex === index
                      ? `fade-in ${link.title.toLowerCase()}`
                      : `${link.title.toLowerCase()}`
                  }
                >
                  <Img fluid={link.image} />
                </ImageContainer>
              );
            }
          })}
        </div>
      </Wrapper>

      {/* Collections */}
      <Wrapper flex activeClass shiftRight className={hideMenuTwo}>
        <div className="linklist-container">
          <div className="inner-wrap">
            <h4>New</h4>
            <div className="list-container">
              <ul>
                {collectionLinks.slice(0, 6).map((link, index) => (
                  <li>
                    <Link
                      onMouseEnter={() => handleMenuItemHover(index)}
                      to={link.url}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
                {collectionLinks.slice(6, 12).map((link, index) => (
                  <li>
                    <Link
                      onMouseEnter={() => handleMenuItemHover(index + 6)}
                      to={link.url}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="image-container">
          {collectionLinks.map((link, index) => {
            if (link.image != null) {
              return (
                <ImageContainer
                  ref={mainMenuImage}
                  className={
                    menuOneImageIndex === index
                      ? `fade-in ${link.title.toLowerCase()}`
                      : `${link.title.toLowerCase()}`
                  }
                >
                  <Img fluid={link.image} />
                </ImageContainer>
              );
            }
          })}
        </div>
      </Wrapper>
    </MegaMenuContainer>
  );
};

export default MegaMenu;