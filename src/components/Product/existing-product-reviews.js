import React, { useState } from "react";
import styled from "styled-components";

import Star from "../../images/star.inline.svg";
import Wrapper from "../org/Wrapper";
import { TransitionMixin } from "../helpers";

const ExistingProductReviewsContainer = styled.div`
  background-color: #000;
  padding: 40px 0;
  position: relative;
  margin-top: 40px;
  .title-wrapper {
    > .title-container {
      margin-bottom: 30px;
      h4 {
        text-align: center;
        font-weight: bold;
        font-size: 17px;
        margin: 0;
        color: #fff;
      }
    }
  }
  .btn-container {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    button {
      -webkit-appearance: none;
      border: none;
      background-color: #fff;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 12px;
      padding: 20px;
      border: 1px solid #fff;
      border-bottom: none;
      line-height: 1;
      max-width: 180px;
      width: 100%;
      ${TransitionMixin(".25s")}

      &:hover {
        background-color: #000;
        color: #fff;
      }

      &:active,
      &:focus {
        background-color: #000;
        color: #fff;
        outline: 0;
      }
    }
  }
  .no-reviews-container {
    padding: 20px 0 70px;
    h4 {
      color: #fff;
      margin: 0;
      text-align: center;
      font-size: 16px;
    }
  }
  .more-review-container {
    text-align: center;
    button {
      max-width: 180px;
      width: 100%;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 50px;
      text-transform: uppercase;
      color: #fff;
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 4px;
      padding: 7px 0;
      ${TransitionMixin(".25s")};

      &:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }
`;

const ReviewContainer = styled.div`
  margin-bottom: 40px;
  .inner-wrap {
    max-width: 650px;
    margin: 0px auto;
    .title-container {
      .stars-container {
        margin-bottom: 10px;
        svg {
          fill: #fff;
          stroke: #fff;
        }
      }

      h4 {
        color: #fff;
        margin-bottom: 10px;
        font-size: 16px;
      }
    }

    .body-container {
      p {
        color: #fff;
        margin-bottom: 10px;
        font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
          Helvetica Neue, sans-serif;
        font-size: 14px;

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
`;

const ExistingProductReviews = ({ reviews, setIsCreateReviewOpen }) => {
  const [reviewsShowing, setReviewsShowing] = useState(3);

  function handleMoreReviewsClick() {
    setReviewsShowing(reviewsShowing + 3);
  }

  console.log(reviews);

  return (
    <ExistingProductReviewsContainer>
      <Wrapper className="title-wrapper">
        <div className="title-container">
          <h4>Reviews</h4>
        </div>
        <Wrapper>
          {reviews.length > 0 ? (
            reviews.slice(0, reviewsShowing).map((review, index) => {
              let stars = [];
              for (let i = 0; i < review.stars; i++) {
                stars.push(i);
              }
              return (
                <ReviewContainer key={index}>
                  <div className="inner-wrap">
                    <div className="title-container">
                      <div className="stars-container">
                        {stars.map(star => (
                          <Star key={star} />
                        ))}
                      </div>
                      <h4>{review.reviewtitle}</h4>
                    </div>
                    <div className="body-container">
                      <p>{review.reviewbody}</p>
                      <p>
                        <strong>{review.reviewername}</strong>
                      </p>
                    </div>
                  </div>
                </ReviewContainer>
              );
            })
          ) : (
            <div className="no-reviews-container">
              <h4>There are no reviews on this product yet.</h4>
            </div>
          )}

          {reviews.length > reviewsShowing && (
            <div className="more-review-container">
              <button onClick={() => handleMoreReviewsClick()}>
                Read More Reviews
              </button>
            </div>
          )}
        </Wrapper>
      </Wrapper>
      <div className="btn-container">
        <button onClick={() => setIsCreateReviewOpen(true)}>
          Leave a Review
        </button>
      </div>
    </ExistingProductReviewsContainer>
  );
};

export default ExistingProductReviews;
