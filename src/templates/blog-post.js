import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Wrapper from "../components/org/Wrapper";

const BlogPostContainerStyles = styled.section`
  padding: 40px 0;
  .title-container {
    margin-bottom: 30px;
    text-align: center;

    h1 {
      font-size: 24px;
    }
  }
  .single-post-container {
    max-width: 800px;

    iframe {
      margin: 0 auto;
    }
  }
`;

const BlogPostContainer = ({ data }) => {
  const post = data.allShopifyArticle.nodes[0];
  function createMarkup() {
    return { __html: post.contentHtml };
  }
  return (
    <Layout>
      <SEO title={post.title} />
      <BlogPostContainerStyles>
        <div className="title-container">
          <Wrapper>
            <h1>{post.title}</h1>
          </Wrapper>
        </div>
        <Wrapper className="single-post-container">
          <div dangerouslySetInnerHTML={createMarkup()}></div>
        </Wrapper>
      </BlogPostContainerStyles>
    </Layout>
  );
};

export default BlogPostContainer;

export const query = graphql`
  query($link: String!) {
    allShopifyArticle(filter: { url: { eq: $link } }) {
      nodes {
        title
        contentHtml
        url
      }
    }
  }
`;
