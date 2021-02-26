import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql, Link } from "gatsby";

const PressSidebarContainer = styled.div`
  > .inner-wrap {
    .friends-of-foray-container {
      margin-bottom: 30px;
      .inner-wrap {
        border: 1px solid #ece8e8;
        padding: 20px;

        h4 {
          text-align: center;
        }
        .logo-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          .logo-item {
            flex: 0 0 33.33%;
            margin-bottom: 20px;
            .gatsby-image-wrapper {
              max-width: 100px;
              max-height: 70px;
              margin: 0 auto;
              img {
                object-fit: contain !important;
              }
            }
          }
        }
      }
    }
    .core-container {
      position: relative;

      .content-block {
        position: absolute;
        bottom: 0;
        background-color: rgba(42, 42, 42, 0.76);
        padding: 10px;
        width: 100%;
        text-align: center;
        h4 {
          margin: 0;
          color: #fff;
        }
      }
    }
    .corporate-container,
    .friends-container {
      margin-top: 30px;
    }
  }
`;

const PressSidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      asher: file(relativePath: { eq: "press/asher.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dormie: file(relativePath: { eq: "press/dormie.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      true: file(relativePath: { eq: "press/true.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vessel: file(relativePath: { eq: "press/vessel.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      clubhouse: file(relativePath: { eq: "press/clubhouse.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      lifestyle: file(relativePath: { eq: "press/lifestyle.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      friends: file(relativePath: { eq: "home/bottom-banner-left.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      corporate: file(relativePath: { eq: "home/bottom-banner-right.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      chippo: file(relativePath: { eq: "press/chippo.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const friends = [
    {
      url: "https://www.ashergolf.com/",
      image: data.asher.childImageSharp.fluid,
    },
    {
      url: "https://truelinkswear.com/",
      image: data.true.childImageSharp.fluid,
    },
    {
      url: "https://vesselbags.com/",
      image: data.vessel.childImageSharp.fluid,
    },
    {
      url: "https://dormieworkshop.com/",
      image: data.dormie.childImageSharp.fluid,
    },
    {
      url: "https://clubhousegolfsupply.stores.jp/",
      image: data.clubhouse.childImageSharp.fluid,
    },
    {
      url: "https://chippogolf.com/",
      image: data.chippo.childImageSharp.fluid,
    },
  ];
  return (
    <PressSidebarContainer>
      <div className="inner-wrap">
        <div className="friends-of-foray-container">
          <div className="inner-wrap">
            <h4>Friends of Foray</h4>
            <div className="logo-grid">
              {friends.map((logo, index) => {
                return (
                  <div key={index} className="logo-item">
                    <a target="_blank" href={logo.url}>
                      <Img fluid={logo.image} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="core-container">
          <Link to="/collections/core-2-0-collection">
            <Img fluid={data.lifestyle.childImageSharp.fluid} />
            <div className="content-block">
              <h4>Core 2.0.</h4>
            </div>
          </Link>
        </div>

        <div className="corporate-container">
          <Link to="/pages/corporate">
            <Img fluid={data.corporate.childImageSharp.fluid} />
          </Link>
        </div>

        <div className="friends-container">
          <Link to="/pages/friends-of-foray">
            <Img fluid={data.friends.childImageSharp.fluid} />
          </Link>
        </div>
      </div>
    </PressSidebarContainer>
  );
};

export default PressSidebar;
