import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { window } from "browser-monads";

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
  const fallbackImg = data.fallbackSeoImage.childImageSharp.original.src;
  function createMarkup() {
    return { __html: post.contentHtml };
  }
  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.content
          .split(" ")
          .slice(0, 160)
          .join(" ")}
      >
        <meta name="og:image" content={window.location.host + fallbackImg} />
        <meta name="image" content={window.location.host + fallbackImg} />
      </SEO>
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
        content
        contentHtml
        url
      }
    }
    fallbackSeoImage: file(relativePath: { eq: "seoImages/home-page.jpg" }) {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
`;
