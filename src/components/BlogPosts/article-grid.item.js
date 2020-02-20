import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { Link } from "gatsby";

const ArticleGridItemContainer = styled.article`
  flex: 0 0 50%;
  margin-bottom: 40px;

  .inner-wrap {
    max-width: 90%;
    margin: 0 auto;

    .image-container {
      max-height: 400px;
      position: relative;
      overflow: hidden;
      display: flex;

      a {
        flex: 1;
        display: flex;
        .gatsby-image-wrapper {
          flex: 1;
        }
      }

      img {
        margin-bottom: 0px;
      }
    }
    .content-container {
      padding: 20px 0 0;
      h2 {
        font-size: 15px;
        margin-bottom: 0px;
      }

      a {
        color: #777;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1px;
        font-size: 11px;
      }
    }
  }
`;

const ArticleGridItem = ({ article }) => {
  console.log(article);
  const link = article.url.replace("https://www.foraygolf.com", "");
  return (
    <ArticleGridItemContainer>
      <div className="inner-wrap">
        <div className="image-container">
          <Link to={link}>
            <Img fluid={article.image.localFile.childImageSharp.fluid} />{" "}
          </Link>
        </div>
        <div className="content-container">
          <h2>{article.title}</h2>
          <Link to={link}>Learn More</Link>
        </div>
      </div>
    </ArticleGridItemContainer>
  );
};

export default ArticleGridItem;
