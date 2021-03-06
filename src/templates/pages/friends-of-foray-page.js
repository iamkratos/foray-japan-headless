import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { window } from "browser-monads";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Wrapper from "../../components/org/Wrapper";
import { TransitionMixin, media } from "../../components/helpers";

const BannerContainer = styled.div`
  .desktop-only {
    display: none;
    ${media.medium`display: block;`}
  }

  .mobile-only {
    ${media.medium`display: none;`}
  }
`;

const FriendsOfForayContainer = styled.section`
  .form-outer-container {
    padding: 40px 0;
    ${media.medium`max-width: 800px;`}
  }
  .form-container {
    flex: 1;

    h1 {
      text-align: center;
      margin: 0 0 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 19px;
    }

    p {
      text-align: center;
      font-weight: 500;
      color: #777;
    }

    .input-wrap {
      display: flex;
      margin-bottom: 10px;
      label {
        flex: 1;

        input {
          width: 100%;
          padding: 10px 15px;
          font-size: 14px;
          font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          border: 1px solid #ccc;
        }
        textarea {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #ccc;
          font-size: 14px;
          font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        }
      }

      input[type="submit"] {
        background-color: #000;
        color: #fff;
        font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
          Helvetica Neue, sans-serif;
        border: 1px solid #000;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 1px;
        padding: 5px 10px;
        min-width: 110px;
        margin-top: 10px;
        ${TransitionMixin(".25s")}

        &:hover {
          cursor: pointer;
          background-color: #fff;
          color: #000;
        }
      }

      &.split {
        label {
          &:first-child {
            margin-right: 20px;
          }
        }
      }
    }
  }
`;
const FriendsOfForay = ({ page, fallbackImg }) => {
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      desktopImage: file(relativePath: { eq: "pages/friends-of-foray.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobileImage: file(
        relativePath: { eq: "pages/mobile-friends-of-foray.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (window.location.href.includes("#form-submitted")) {
      setHasFormBeenSubmitted(true);
    }
  }, []);
  return (
    <Layout>
      <SEO
        title={page.title}
        description={
          page.bodySummary &&
          page.bodySummary
            .split(" ")
            .slice(0, 160)
            .join(" ")
        }
      >
        <meta name="og:image" content={window.location.origin + fallbackImg} />
        <meta name="image" content={window.location.origin + fallbackImg} />
      </SEO>
      <FriendsOfForayContainer>
        <BannerContainer>
          <Img
            className="desktop-only"
            fluid={data.desktopImage.childImageSharp.fluid}
          />
          {data.mobileImage && (
            <Img
              className="mobile-only"
              fluid={data.mobileImage.childImageSharp.fluid}
            />
          )}
        </BannerContainer>
        <Wrapper className="form-outer-container">
          <div className="form-container">
            <h1>{page.title}</h1>
            <p>
              {!hasFormBeenSubmitted
                ? "We love growing our team! 20% off for students and teaching pros"
                : "Thank you for your submission. We will review it shortly."}
            </p>
            {!hasFormBeenSubmitted ? (
              <form
                name="friends-of-foray-page"
                method="POST"
                action="https://manage.kmail-lists.com/subscriptions/subscribe?a=YjDwJK&g=XB3wyi"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="form"
              >
                <input name="bot-field" type="hidden" />
                <input type="hidden" name="g" value="XB3wyi" />

                <div className="input-wrap split">
                  <label htmlFor="name">
                    <input
                      type="text"
                      className="form-control"
                      name="k2b7fba9b6dca14c27e444bc6bab43584"
                      placeholder="Name"
                      required
                    />
                  </label>
                  <label htmlFor="email">
                    <input
                      required
                      placeholder="Email"
                      type="email"
                      className="form-control"
                      name="email"
                    />
                  </label>
                </div>
                <div className="input-wrap">
                  <label htmlFor="phone">
                    <input
                      type="text"
                      className="form-control"
                      name="kdb5caa720141e9baac2cb818a7a707ee"
                      placeholder="School | Organization | Course"
                      required
                    />
                  </label>
                </div>
                <div className="input-wrap">
                  <input type="submit" value="Send" />
                </div>
              </form>
            ) : (
              ""
            )}

            {/* <form
              name="friends-of-foray-page"
              method="POST"
              action="/success"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="form"
            >
              <input name="bot-field" type="hidden" />
              <input
                type="hidden"
                name="form-name"
                value="friends-of-foray-page"
              />
              <div className="input-wrap split">
                <label htmlFor="name">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </label>
                <label htmlFor="email">
                  <input
                    required
                    placeholder="Email"
                    type="email"
                    className="form-control"
                    name="email"
                  />
                </label>
              </div>
              <div className="input-wrap">
                <label htmlFor="phone">
                  <input
                    type="text"
                    className="form-control"
                    name="organization"
                    placeholder="School | Organization | Course"
                    required
                  />
                </label>
              </div>
              <div className="input-wrap">
                <input type="submit" value="Send" />
              </div>
            </form> */}
          </div>
        </Wrapper>
      </FriendsOfForayContainer>
    </Layout>
  );
};

export default FriendsOfForay;
