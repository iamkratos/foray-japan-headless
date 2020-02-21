import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import Wrapper from "../components/org/Wrapper";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { TransitionMixin } from "../components/helpers";

const NotFoundContainer = styled.section`
  padding: 70px 0 0;
  text-align: center;

  .title-container {
    h1 {
      font-size: 24px;
    }

    a {
      text-decoration: none;
      padding-bottom: 4px;
      color: #000;
      border-bottom: 2px solid #000;
      font-weight: bold;
      font-size: 14px;
      ${TransitionMixin(".25s")}

      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <NotFoundContainer>
      <Wrapper>
        <div className="title-container">
          <h1>NOT FOUND</h1>
          <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
          <Link to="/">Return to Home</Link>
        </div>
      </Wrapper>
    </NotFoundContainer>
  </Layout>
);

export default NotFoundPage;
