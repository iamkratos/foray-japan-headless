import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { media } from "../helpers";

const PressItemContainer = styled.div`
  margin-bottom: 50px;
  > .inner-wrap {
    border: 1px solid #ece8e8;
    ${media.medium`display: flex;`}

    .image-container {
      flex: 1;
      max-height: 370px;
      overflow: hidden;
    }

    .content-container {
      flex: 1;
      padding: 20px;

      ${media.medium`display: flex; align-items: center; padding: 0px 30px;`}

      > .inner-wrap {
        h3 {
          font-size: 21px;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        p {
          color: #777;
          margin: 0px;
          font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          font-size: 14px;
        }

        .article-ref {
          display: flex;
          align-items: center;
          margin: 20px 0;

          .logo-container {
            max-width: 160px;
            flex: 1;

            img {
              margin-bottom: 0px;
            }
          }

          p {
            margin: 0;
            text-transform: uppercase;
            font-weight: bold;
            color: #4a4a4a;
            font-size: 12px;
          }
        }

        a.read-more {
          background-color: #000;
          color: #fff;
          text-transform: uppercase;
          font-weight: bold;
          text-decoration: none;
          font-size: 13px;
          min-width: 200px;
          display: inline-block;
          text-align: center;
          line-height: 1;
          border-radius: 4px;
          padding: 10px 0;
        }
      }
    }
  }
`;

const PressItem = ({ item }) => {
  const { title, excerpt, article_link, press_link } = item;
  const thumbnail = item.thumbnail.localFile.childImageSharp.fluid;
  const press_logo =
    item.press_logo && item.press_logo.localFile.childImageSharp.fluid;
  return (
    <PressItemContainer>
      <div className="inner-wrap">
        <div className="image-container">
          <Img fluid={thumbnail} />
        </div>

        <div className="content-container">
          <div className="inner-wrap">
            <h3>{title}</h3>
            <p>{excerpt}</p>
            <div className="article-ref">
              <div className="logo-container">
                <a target="_blank" href={press_link}>
                  {item.press_logo && <Img fluid={press_logo} />}
                </a>
              </div>
            </div>

            {article_link && article_link !== "" ? (
              <Link className="read-more" to={article_link}>
                Read More
              </Link>
            ) : (
              <a target="_blank" className="read-more" href={press_link}>
                Read More
              </a>
            )}
          </div>
        </div>
      </div>
    </PressItemContainer>
  );
};

export default PressItem;
