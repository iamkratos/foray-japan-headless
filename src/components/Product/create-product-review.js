import React, { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";

import Wrapper from "../org/Wrapper";
import X from "../../images/x.inline.svg";
import { TransitionMixin, media } from "../helpers";

const CreateProductReviewContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: 100vh;
  .modal-background {
    background-color: rgba(0, 0, 0, 0.85);
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
  }

  .modal-content {
    z-index: 2000;
    flex: 1;
    max-width: 90vw;
    margin: 0 auto;
    ${media.medium`max-width: 650px;`}
  }

  .form-container {
    border-radius: 4px;
    background-color: #fff;
    position: relative;
    padding: 20px;
    border: 1px solid #fff;
    .confirmation-container {
      text-align: center;
      padding: 40px 0;

      h4 {
        margin-bottom: 0px;
      }
    }
    .form-title {
      text-align: right;
      h4 {
        background-color: #000;
        border-radius: 4px;
        margin: 0;
        line-height: 1;
        color: #fff;
        text-align: center;
        text-transform: uppercase;
        padding: 10px;
        margin-bottom: 0px;
        font-size: 13px;
        font-weight: bold;
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
      }

      .close-btn {
        position: absolute;
        top: -50px;
        right: -100px;

        button {
          -webkit-appearance: none;
          background-color: transparent;
          color: #fff;
          border: none;
          line-height: 1;

          svg {
            height: 40px;
            width: 40px;
          }
        }
      }
    }
    form {
      margin-bottom: 0px;
      .mini-label {
        display: block;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
        margin-bottom: 5px;
      }

      .input-container {
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        &:last-child {
          margin-bottom: 0px;
        }

        > label {
          display: block;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 1px;
          margin-bottom: 5px;
          flex: 1 1 100%;
        }
        &.mb-sm {
          margin-bottom: 10px;
        }

        &.hidden {
          display: none;
        }

        input {
          flex: 1;
          font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          height: 40px;
          padding-left: 10px;
          font-size: 15px;
          border-radius: 4px;
          border: 1px solid #ccc;
          &.hidden {
            display: none;
          }
        }

        textarea {
          flex: 1;
          font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          min-height: 200px;
          padding-top: 5px;
          padding-left: 10px;
          font-size: 15px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        button {
          color: #fff;
          background-color: #000;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 13px;
          border: 1px solid #ccc;
          border-radius: 4px;
          line-height: 1;
          padding: 10px 20px;
          min-width: 120px;
          ${TransitionMixin(".25s")}

          &:hover {
            color: #000;
            background-color: #fff;
          }
        }

        .stars {
          .radio-stars {
            display: inline-block;
            position: relative;

            unicode-bidi: bidi-override;
            direction: rtl;

            counter-reset: star-rating;
            line-height: 1;
            font-size: 0;

            .radio-star::before {
              content: "☆";
            }

            .radio-star:hover {
              &::before,
              ~ .radio-star::before {
                content: "★";
              }
            }
          }

          .radio-star {
            display: inline-block;
            overflow: hidden;
            cursor: pointer;

            padding: 5px 2px;
            width: 1em;

            direction: ltr;
            color: rgba(0, 0, 0, 0.25);
            font-size: 25px;
            white-space: nowrap;

            &::before {
              content: "☆";
            }

            &.active {
              color: #000;
              &::before {
                content: "★";
              }
            }

            &:hover ~ &,
            input:checked ~ & {
              color: #000;
            }

            input:checked ~ & {
              counter-increment: star-rating;

              &::before {
                content: "★";
              }
            }
          }

          .radio-star-total {
            pointer-events: none;
            direction: ltr;
            unicode-bidi: bidi-override;

            position: absolute;
            right: -2em;
            bottom: 0.5em;

            color: gray;
            color: white;
            font-size: 25px / 2;

            &::before {
              content: counter(star-rating) "/5";
            }
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            margin: -1px;
            padding: 0;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
        }
      }
    }
  }
`;

const CreateProductReview = ({
  productID,
  productName,
  productHandle,
  style,
  setIsCreateReviewOpen,
}) => {
  const [stars, setStars] = useState(0);
  const [isReviewComplete, setIsReviewComplete] = useState(false);

  function handleReviewSubmit(e) {
    e.preventDefault();
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyGzNk67ITM6UMp29uDcEVLZExQLyL3E2E-6tnvCVjZojPr4As/exec";

    console.log(e.target);
    fetch(scriptURL, { method: "POST", body: new FormData(e.target) })
      .then(response => {
        console.log("Success!", response);
        setIsReviewComplete(true);
        setTimeout(function() {
          setIsCreateReviewOpen(false);
        }, 5000);
      })
      .catch(error => console.error("Error!", error.message));
  }

  return (
    <CreateProductReviewContainer style={{ ...style }}>
      <div
        className="modal-background"
        onClick={() => setIsCreateReviewOpen(false)}
      ></div>

      <Wrapper className="modal-content">
        <div className="form-container">
          <div className="form-title">
            <h4>New Review</h4>
            <div className="close-btn">
              <button onClick={() => setIsCreateReviewOpen(false)}>
                <X />
              </button>
            </div>
          </div>
          {isReviewComplete && (
            <div className="confirmation-container">
              <h4>Thanks for submitting your review!</h4>
            </div>
          )}
          {!isReviewComplete && (
            <form onSubmit={e => handleReviewSubmit(e)}>
              <div className="input-container hidden">
                <input name="productID" type="text" value={productID} />
              </div>
              <div className="input-container hidden">
                <input name="productName" type="text" value={productName} />
              </div>
              <div className="input-container hidden">
                <input name="productHandle" type="text" value={productHandle} />
              </div>
              <div className="input-container hidden">
                <input name="approved" type="text" value="no" />
              </div>
              <div className="input-container mb-sm">
                <label class="stars" htmlFor="stars">
                  <span className="mini-label">Stars</span>
                  <input
                    className="hidden"
                    type="text"
                    name="stars"
                    value={stars}
                  />
                  <div class="radio-stars">
                    <input
                      class="sr-only"
                      id="radio-5"
                      name="radio-stars"
                      type="radio"
                      value="5"
                    />
                    <label
                      className={
                        "radio-star " + (stars > 0 && stars > 4 ? "active" : "")
                      }
                      for="radio-5"
                      onClick={() => setStars(5)}
                    >
                      5
                    </label>
                    <input
                      checked=""
                      class="sr-only"
                      id="radio-4"
                      name="radio-star"
                      type="radio"
                      value="4"
                    />
                    <label
                      className={
                        "radio-star " + (stars > 0 && stars > 3 ? "active" : "")
                      }
                      for="radio-4"
                      onClick={() => setStars(4)}
                    >
                      4
                    </label>
                    <input
                      class="sr-only"
                      id="radio-3"
                      name="radio-star"
                      type="radio"
                      value="3"
                    />
                    <label
                      className={
                        "radio-star " + (stars > 0 && stars > 2 ? "active" : "")
                      }
                      for="radio-3"
                      onClick={() => setStars(3)}
                    >
                      3
                    </label>
                    <input
                      class="sr-only"
                      id="radio-2"
                      name="radio-star"
                      type="radio"
                      value="2"
                    />
                    <label
                      className={
                        "radio-star " + (stars > 0 && stars > 1 ? "active" : "")
                      }
                      for="radio-2"
                      onClick={() => setStars(2)}
                    >
                      2
                    </label>
                    <input
                      class="sr-only"
                      id="radio-1"
                      name="radio-star"
                      type="radio"
                      value="1"
                    />
                    <label
                      className={
                        "radio-star " + (stars > 0 && stars > 0 ? "active" : "")
                      }
                      for="radio-1"
                      onClick={() => setStars(1)}
                    >
                      1
                    </label>
                  </div>
                </label>
              </div>
              <div className="input-container">
                <label htmlFor="email">Name</label>
                <input name="text" required type="name" />
              </div>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input name="email" required type="email" />
              </div>
              <div className="input-container">
                <label htmlFor="name">Review Title</label>
                <input name="reviewTitle" required type="text" />
              </div>
              <div className="input-container">
                <label htmlFor="reviewBody">Review Body</label>
                <textarea required name="reviewBody"></textarea>
              </div>
              <div className="input-container">
                <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </div>
      </Wrapper>
    </CreateProductReviewContainer>
  );
};

export default CreateProductReview;
