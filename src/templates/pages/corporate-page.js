import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import { window } from "browser-monads";

import SEO from "../../components/seo";
import Layout from "../../components/layout";
import Wrapper from "../../components/org/Wrapper";
import { media, TransitionMixin } from "../../components/helpers";

const CorporatePageContainer = styled.section`
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

const CorporatePage = ({ page, fallbackImg }) => {
  const data = useStaticQuery(graphql`
    query {
      banner: file(relativePath: { eq: "pages/corporate.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobileBanner: file(relativePath: { eq: "pages/mobile-corporate.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  function createMarkup() {
    return { __html: page.body };
  }

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
      <CorporatePageContainer>
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
              <div dangerouslySetInnerHTML={createMarkup()}></div>
            </div>
          </div>
          <div className="form-container">
            <div className="inner-wrap">
              <h4>Inquire Here</h4>
              <form
                name="corporate-page"
                method="POST"
                action="/success"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="form"
              >
                <input name="bot-field" type="hidden" />
                <input type="hidden" name="form-name" value="corporate-page" />
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
                      name="club"
                      placeholder="Club/Organization/Charity"
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
      </CorporatePageContainer>
    </Layout>
  );
};

export default CorporatePage;
