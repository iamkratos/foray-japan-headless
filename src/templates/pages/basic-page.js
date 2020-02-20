import React from "react";
import styled from "styled-components";

import SEO from "../../components/seo";
import Layout from "../../components/layout";
import Wrapper from "../../components/org/Wrapper";
import { media } from "../../components/helpers";

const BasicPageContainer = styled.section`
  padding-top: 40px;
  .title-container {
    text-align: center;
    h1 {
      color: #000;
      font-size: 24px;
      ${media.medium`font-size: 32px;`}
    }
  }

  .content-container {
    img {
      margin: 0 auto !important;
    }
  }
`;

const BasicPage = ({ page }) => {
  function createMarkup() {
    return { __html: page.body };
  }
  return (
    <Layout>
      <SEO title={page.title} />
      <BasicPageContainer>
        <Wrapper>
          <div className="title-container">
            <h1>{page.title}</h1>
          </div>
          <div className="content-container">
            <Wrapper size="xs">
              <div dangerouslySetInnerHTML={createMarkup()}></div>
            </Wrapper>
          </div>
        </Wrapper>
      </BasicPageContainer>
    </Layout>
  );
};

export default BasicPage;
