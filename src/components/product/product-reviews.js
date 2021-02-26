import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useTransition } from "react-spring";

import CreateProductReview from "./create-product-review";
import ExistingProductReviews from "./existing-product-reviews";

const ProductReviewsContainer = styled.div``;

const FrozenScroll = createGlobalStyle`
  body, html {
    overflow-y: hidden;
  }
`;

const ProductReviews = ({ productID, productName, productHandle, reviews }) => {
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);

  const createReviewTransition = useTransition(isCreateReviewOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <ProductReviewsContainer>
      <ExistingProductReviews
        reviews={reviews}
        setIsCreateReviewOpen={setIsCreateReviewOpen}
      />

      {/* Freeze scrolling if Create Review modal is open */}
      {isCreateReviewOpen && <FrozenScroll />}

      {createReviewTransition.map(({ item, key, props }) => {
        return (
          item && (
            <CreateProductReview
              key={key}
              style={props}
              productID={productID}
              productName={productName}
              productHandle={productHandle}
              setIsCreateReviewOpen={setIsCreateReviewOpen}
            />
          )
        );
      })}
    </ProductReviewsContainer>
  );
};

export default ProductReviews;
