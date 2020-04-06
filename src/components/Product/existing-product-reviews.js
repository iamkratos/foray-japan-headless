import React from "react";
import styled from "styled-components";

import Star from "../../images/star.inline.svg";
import Wrapper from "../org/Wrapper";

const ExistingProductReviewsContainer = styled.div`
  background-color: #000;
  padding: 40px 0;
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

const ExistingProductReviews = ({ reviews }) => {
  return (
    <ExistingProductReviewsContainer>
      <Wrapper className="title-wrapper">
        <div className="title-container">
          <h4>Reviews</h4>
        </div>

        <Wrapper>
          {reviews.map(review => {
            let stars = [];
            for (let i = 0; i < review.stars; i++) {
              stars.push(i);
            }
            console.log(stars);
            return (
              <ReviewContainer>
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
          })}
        </Wrapper>
      </Wrapper>
    </ExistingProductReviewsContainer>
  );
};

export default ExistingProductReviews;
