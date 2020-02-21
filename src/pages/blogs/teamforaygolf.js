import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../../components/layout";
import Wrapper from "../../components/org/Wrapper";
import SEO from "../../components/seo";
import { media } from "../../components/helpers";
import ArticleGridItem from "../../components/BlogPosts/article-grid.item";

const BlogIndexPageContainer = styled.section`
  padding: 40px 0;

  .blog-index-wrapper {
    ${media.medium`display: flex; flex-wrap: wrap;`}
  }

  .title-container {
    text-align: center;
    padding-bottom: 40px;
    h1 {
      margin-bottom: 0px;
      font-size: 21px;
    }
  }
`;

const BlogIndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyArticle(filter: { blog: { title: { eq: "TEAMFORAYGOLF" } } }) {
        edges {
          node {
            title
            excerptHtml
            url
            image {
              localFile {
                id
                childImageSharp {
                  fluid(maxWidth: 800, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const articles = data.allShopifyArticle.edges;
  return (
    <Layout>
      <SEO title="TEAMFORAYGOLF" />
      <BlogIndexPageContainer>
        <Wrapper>
          <div className="title-container">
            <h1>#TEAMFORAYGOLF</h1>
          </div>

          <Wrapper className="blog-index-wrapper">
            {articles.map(article => {
              return <ArticleGridItem article={article.node} />;
            })}
          </Wrapper>
        </Wrapper>
      </BlogIndexPageContainer>
    </Layout>
  );
};

export default BlogIndexPage;
