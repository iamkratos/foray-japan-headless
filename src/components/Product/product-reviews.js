import React from "react";
import styled from "styled-components";

import CreateProductReview from "./create-product-review";
import ExistingProductReviews from "./existing-product-reviews";

const ProductReviewsContainer = styled.div``;

const ProductReviews = ({ productID, productName, productHandle, reviews }) => {
  return (
    <ProductReviewsContainer>
      <ExistingProductReviews reviews={reviews} />
      {/* <CreateProductReview
        productID={productID}
        productName={productName}
        productHandle={productHandle}
      /> */}
    </ProductReviewsContainer>
  );
};

export default ProductReviews;
