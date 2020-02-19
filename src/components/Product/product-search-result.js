import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const ProductSearchResultContainer = styled.div`
  flex: 0 0 25%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
  > .inner-wrap {
    max-width: 90%;
    flex: 1;
    .image-container {
      img {
        max-height: 150px;
        max-width: 100px;
        margin: 0 auto 10px;
        display: block;
      }
    }
    .content-container {
      .inner-wrap {
        text-align: center;
        h4 {
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 14px;
          max-width: 230px;
          margin: 0 auto;
        }
      }
    }
  }
`;

const ProductSearchResult = ({ product }) => {
  return (
    <ProductSearchResultContainer>
      <div className="inner-wrap">
        <Link to={`/products/${product.handle}`}>
          <div className="image-container">
            <img src={product.product_image} alt="" />
          </div>
        </Link>
        <div className="content-container">
          <div className="inner-wrap">
            <h4>{product.title}</h4>
          </div>
        </div>
      </div>
    </ProductSearchResultContainer>
  );
};

export default ProductSearchResult;
