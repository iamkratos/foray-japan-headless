import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import Img from "gatsby-image";

const BasicProductGridItemContainer = styled.div`
  margin-bottom: 30px;
  > .inner-wrap {
    max-width: 90%;
    margin: 0 auto;

    .content-container {
      a {
        text-decoration: none;
        color: #000;
      }
      .inner-wrap {
        padding: 10px 0 0;

        h4 {
          line-height: 1.3;
          font-size: 13px;
          margin-bottom: 0px;
        }
        p {
          font-size: 13px;
          flex: 1;
          margin-bottom: 0px;
          color: #777;
          font-weight: 700;
        }
      }
    }
  }
`;

const BasicProductGridItem = ({ product }) => {
  console.log("product", product);
  return (
    <BasicProductGridItemContainer>
      <div className="inner-wrap">
        <div className="image-container">
          <Link to={`/products/${product.handle}`}>
            <Img fluid={product?.images[0]?.localFile.childImageSharp?.fluid} />
          </Link>
        </div>
        <div className="content-container">
          <Link to={`/products/${product.handle}`}>
            <div className="inner-wrap">
              <h4>{product.title}</h4>
              <p>
                $
                {product?.priceRange?.maxVariantPrice?.amount.replace(".0", "")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </BasicProductGridItemContainer>
  );
};

export default BasicProductGridItem;
