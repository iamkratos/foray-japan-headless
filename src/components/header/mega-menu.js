import React, { useRef } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import { TransitionMixin, media } from "../helpers";
import { motion } from "framer-motion";

import Wrapper from "../org/Wrapper";

const MegaMenuContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  top: 83px;
  left: 0;
  background-color: #fff;
  /* min-height: 368px; */
  z-index: 400;
  border-bottom: 1px solid #efefef;
  ${media.medium`top: 129px;`}
  ${TransitionMixin(".25s")}
  &.shrunk {
    ${media.medium`top: 100px;`}
  }

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
    min-height: 310px;
    ${media.laptop`min-height: 330px;`}
    ${media.xl`min-height: 420px;`}
    
    ${media.xxl`min-height: 430px;`}
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
  isMenuShrunk,
  style,
}) => {
  const data = useStaticQuery(graphql`
    query {
      topsImage: file(relativePath: { eq: "menu-items/shop-by/tops-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      bottomsImage: file(
        relativePath: { eq: "menu-items/shop-by/bottoms-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      jacketsImage: file(
        relativePath: { eq: "menu-items/shop-by/jackets-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      layeringImage: file(
        relativePath: { eq: "menu-items/shop-by/layering-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sweatersImage: file(
        relativePath: { eq: "menu-items/shop-by/sweaters-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      outerwearImage: file(
        relativePath: { eq: "menu-items/shop-by/outerwear-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dressesImage: file(
        relativePath: { eq: "menu-items/shop-by/dresses-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      kidsImage: file(relativePath: { eq: "menu-items/shop-by/kids-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      accessoriesImage: file(
        relativePath: { eq: "menu-items/shop-by/accessories-1.jpg" }
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
        relativePath: { eq: "menu-items/collections/graphic-floral-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dluxe: file(relativePath: { eq: "menu-items/collections/d-luxe-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      winterFloom: file(
        relativePath: { eq: "menu-items/collections/winter-floom-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mercuryRising: file(
        relativePath: { eq: "menu-items/collections/mercury-rising-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sunDaze: file(
        relativePath: { eq: "menu-items/collections/sun-daze-1.jpg" }
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
      core: file(relativePath: { eq: "menu-items/collections/core-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      laceEscape: file(
        relativePath: { eq: "menu-items/collections/lace-escape-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      floomOfficial: file(
        relativePath: { eq: "menu-items/collections/floom-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rockstud: file(
        relativePath: { eq: "menu-items/collections/rockstud-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      finalSale: file(
        relativePath: { eq: "menu-items/collections/final-sale.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dreamWeaver: file(
        relativePath: { eq: "menu-items/collections/dream-weaver-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      incognito: file(
        relativePath: { eq: "menu-items/collections/incognito-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      inTheFold: file(
        relativePath: { eq: "menu-items/collections/in-the-fold.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dayGlo: file(relativePath: { eq: "menu-items/collections/day-glo.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      americaTwo: file(
        relativePath: { eq: "menu-items/collections/america-2-0.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      theOddyesey: file(
        relativePath: { eq: "menu-items/collections/the-oddyesey.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      birdsInParadise: file(
        relativePath: { eq: "menu-items/collections/birds-in-paradise.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      hotHouse: file(
        relativePath: { eq: "menu-items/collections/hot-house.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      currentWave: file(
        relativePath: { eq: "menu-items/collections/current-wave.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      chainReaction: file(
        relativePath: { eq: "menu-items/collections/chain-reaction.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ditsyBlitz: file(
        relativePath: { eq: "menu-items/collections/ditsy-blitz.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      frostedFloom: file(
        relativePath: { eq: "menu-items/collections/frosted-floom.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      clubQuarters: file(
        relativePath: { eq: "menu-items/collections/club-quarters.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      queenOfClubs: file(
        relativePath: { eq: "menu-items/collections/queen-of-clubs.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vanishingPoint: file(
        relativePath: { eq: "menu-items/collections/vanishing-point.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      society: file(
        relativePath: { eq: "menu-items/collections/society.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  // console.log("data!", data);
  const collectionLinks = [
    {
      title: "Society",
      url: "/collections/society",
      image: data.society.childImageSharp.fluid,
    },
    {
      title: "Vanishing Point",
      url: "/collections/vanishing-point",
      image: data.vanishingPoint.childImageSharp.fluid,
    },
    {
      title: "Queen of Clubs",
      url: "/collections/queen-of-clubs",
      image: data.queenOfClubs.childImageSharp.fluid,
    },
    {
      title: "Club Quarters",
      url: "/collections/club-quarters",
      image: data.clubQuarters.childImageSharp.fluid,
    },
    {
      title: "Frosted Floom",
      url: "/collections/frosted-floom",
      image: data.frostedFloom.childImageSharp.fluid,
    },
    {
      title: "Ditsy Blitz",
      url: "/collections/ditsy-blitz",
      image: data.ditsyBlitz.childImageSharp.fluid,
    },
    {
      title: "Chain Reaction",
      url: "/collections/chain-reaction",
      image: data.chainReaction.childImageSharp.fluid,
    },
    {
      title: "Current Wave",
      url: "/collections/current-wave",
      image: data.currentWave.childImageSharp.fluid,
    },
    {
      title: "Hot House",
      url: "/collections/hot-house",
      image: data.hotHouse.childImageSharp.fluid,
    },

    {
      title: "Core 2.0",
      url: "/collections/core-2-0-collection",
      image: data.core.childImageSharp.fluid,
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
      title: "Layering",
      url: "/collections/layering",
      image: data.layeringImage.childImageSharp.fluid,
    },
    {
      title: "Sweaters",
      url: "/collections/sweaters",
      image: data.sweatersImage.childImageSharp.fluid,
    },
    {
      title: "Jackets",
      url: "/collections/jackets",
      image: data.jacketsImage.childImageSharp.fluid,
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
      title: "Final Sale",
      url: "/collections/final-sale",
      image: data.finalSale.childImageSharp.fluid,
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

  let hideMenuOne = megaMenuIndex === 0 ? "" : "hide";
  let hideMenuTwo = megaMenuIndex === 1 ? "" : "hide";

  let collectionMenuIndex = 5;
  return (
    <MegaMenuContainer
      // className={isMenuShrunk === true ? "shrunk" : ""}
      key="content"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { y: 0 },
        collapsed: { y: -800 },
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {/* Shop By */}
      <Wrapper flex activeClass shiftRight className={hideMenuOne}>
        <div className="linklist-container">
          <div className="inner-wrap">
            <h4>Shop By</h4>
            <div className="list-container">
              <ul>
                {shopByLinks.slice(0, 5).map((link, index) => (
                  <li key={index}>
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
                {shopByLinks.slice(5, 10).map((link, index) => (
                  <li key={index}>
                    <Link
                      onMouseEnter={() => handleMenuItemHover(index + 5)}
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
          {shopByLinks.map((link, index) => {
            if (link.image != null) {
              return (
                <ImageContainer
                  key={index}
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
            return null;
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
                {collectionLinks
                  .slice(0, collectionMenuIndex)
                  .map((link, index) => (
                    <li key={index}>
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
                {collectionLinks
                  .slice(collectionMenuIndex, collectionLinks.length)
                  .map((link, index) => (
                    <li key={index}>
                      <Link
                        onMouseEnter={() =>
                          handleMenuItemHover(index + collectionMenuIndex)
                        }
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
                  key={index}
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
            return null;
          })}
        </div>
      </Wrapper>
    </MegaMenuContainer>
  );
};

export default MegaMenu;
