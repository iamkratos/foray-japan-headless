import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import { window } from "browser-monads";

import SEO from "../../components/seo";
import Layout from "../../components/layout";
import Wrapper from "../../components/org/Wrapper";
import { media, TransitionMixin } from "../../components/helpers";

const SourcingPageContainer = styled.section`
  .banner-container {
    .desktop-only {
      display: none;
      ${media.medium`display: block;`}
    }
    .mobile-only {
      ${media.medium`display: none;`}
    }
  }

  .contact-wrapper {
    padding: 40px 0;
    ${media.medium`display: flex;`}
  }

  .content-container {
    flex: 1;
    margin-bottom: 70px;
    ${media.medium`margin-bottom: 0px;`}
    .inner-wrap {
      max-width: 90%;

      p,
      span {
        font-size: 16px;
      }
    }
  }
  .form-container {
    flex: 1;

    h4 {
      margin: 0 0 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 14px;
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

const SourcingPage = ({ page, fallbackImg }) => {
  const data = useStaticQuery(graphql`
    query {
      banner: file(relativePath: { eq: "pages/sourcing.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobileBanner: file(relativePath: { eq: "pages/mobile-sourcing.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1080, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO
        title={"Sourcing"}
        // description={
        //   page.bodySummary &&
        //   page.bodySummary
        //     .split(" ")
        //     .slice(0, 160)
        //     .join(" ")
        // }
      >
        <meta name="og:image" content={window.location.origin + fallbackImg} />
        <meta name="image" content={window.location.origin + fallbackImg} />
      </SEO>
      <SourcingPageContainer>
        <div className="banner-container">
          <div className="desktop-only">
            <Img fluid={data.banner.childImageSharp.fluid} />
          </div>

          <div className="mobile-only">
            <Img fluid={data.mobileBanner.childImageSharp.fluid} />
          </div>
        </div>
        <Wrapper className="contact-wrapper">
          <div className="content-container">
            <div className="inner-wrap">
              <p>
                Foray Sourcing is the apparel & accessory development vertical
                of Foray Golf, committed to making all types of private label
                products for a diversity of customers at all scales. Our
                industry connections and product development expertise allow us
                the unique ability to produce or source just about anything—even
                things you might not expect!{" "}
              </p>
              <p>
                Our full-service vertical, manufactures both in the USA and
                overseas, and provides services including design, fit,
                assortment planning, production, logistics and more.
              </p>
              <p>
                Our number one goal is to ensure all your needs are met on time
                and with unmatched quality and flexible minimums.
              </p>

              <p>
                You already know we make the best in women’s golf apparel, but
                that’s only the beginning: from loungewear, to staff uniforms,
                to pool floats, there’s no limit to the items we can create for
                you.
              </p>
            </div>
          </div>
          <div className="form-container">
            <div className="inner-wrap">
              <h4>Want to know more? Please fill out the form:</h4>
              <form
                name="sourcing-page"
                method="POST"
                action="/success"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="form"
              >
                <input name="bot-field" type="hidden" />
                <input type="hidden" name="form-name" value="sourcing-page" />
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
                      placeholder="Email"
                      type="email"
                      className="form-control"
                      name="email"
                      required
                    />
                  </label>
                </div>
                <div className="input-wrap">
                  <label htmlFor="phone">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone Number"
                      required
                    />
                  </label>
                </div>
                <div className="input-wrap">
                  <label htmlFor="phone">
                    <input
                      type="text"
                      className="form-control"
                      name="business-name"
                      placeholder="Business Name"
                      required
                    />
                  </label>
                </div>
                <div className="input-wrap">
                  <label htmlFor="inquiry">
                    <textarea
                      placeholder="Brief Description"
                      name="inquiry"
                      className="form-control"
                      cols="30"
                      required
                      rows="10"
                    />
                  </label>
                </div>
                <div className="input-wrap">
                  <input type="submit" value="Send" />
                </div>
              </form>
            </div>
          </div>
        </Wrapper>
      </SourcingPageContainer>
    </Layout>
  );
};

export default SourcingPage;
