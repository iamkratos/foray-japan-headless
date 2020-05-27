import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";

import X from "../images/x.inline.svg";
import Wrapper from "./org/Wrapper";
import { TransitionMixin, media } from "./helpers";
import { animated, useTransition } from "react-spring";

const PopupContainer = styled.div`
  .popup-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    height: 100vh;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner-container {
      background-color: #fff;
      width: 100%;
      max-width: 90vw;
      ${media.small`max-width: 450px;`}
      ${media.medium`max-width: 850px;`}
      ${media.laptop`max-width: 950px;`}

      .popup-wrapper {
        position: relative;
        .close-btn-container {
          position: absolute;
          right: -5vw;
          top: -5vh;
          display: none;
          ${media.medium`display: block;`}

          button {
            background-color: transparent;
            box-shadow: none;
            -webkit-appearance: none;
            border: 1px solid #fff;
            line-height: 1;
            border-radius: 50%;
            height: 55px;
            width: 55px;
            display: flex;
            justify-content: center;
            padding: 7px;

            &:active, &:focus {
              outline: 0;
            }

            svg {
              stroke: #fff;
              height: 40px;
              width: 40px;
              stroke-width: 1px;
            }

            &:hover {
              background-color: #fff;
              ${TransitionMixin(".25s")}
              svg {
                stroke: #4a4a4a;
                ${TransitionMixin(".25s")}
              }
            }
          }
        }
        .image-container {
          flex: 1;
        }
        .content-container {
          flex: 1;
          display: flex;
          align-items: center;
          .inner-wrap {
            padding: 25px;
            ${media.medium`padding: 0 30px;`}
            h3 {
              font-size: 28px;
              margin-bottom: 10px;
            }
            p {
              font-size: 17px;
              color: #777;
              font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
                Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                Droid Sans, Helvetica Neue, sans-serif;
              line-height: 1.5;
              margin-bottom: 15px;
            }

            .form-container {
              form {
                margin-bottom: 0px;
              }
              .input-container {
                display: flex;

                &:first-child {
                  margin-bottom: 20px;
                }

                input {
                  width: 100%;
                  flex: 1;
                  padding-left: 10px;
                  height: 40px;
                  font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
                    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                    Droid Sans, Helvetica Neue, sans-serif;
                  font-size: 15px;
                }

                button {
                  flex: 1;
                  background: #000;
                  border: 1px solid #000;
                  color: #fff;
                  font-weight: bold;
                  font-size: 13px;
                  letter-spacing: 1px;
                  line-height: 1;
                  padding: 10px 20px;
                  min-width: 120px;
                  border-radius: 4px;
                  font-family: Helvetica Neue, -apple-system, BlinkMacSystemFont,
                    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                    Droid Sans, Helvetica Neue, sans-serif;
                  ${TransitionMixin(".25s")}

                  &:first-child {
                    margin-right: 10px;
                    ${media.medium` margin-right: 0px;`}
                  }
                  &:nth-child(2) {
                    background-color: #fff;
                    color: #000;
                    display: block;
                    ${media.medium`display: none;`}
                    
                    &:hover {
                      background-color: #000;
                      color: #fff;
                    }
                  }

                  &:hover {
                    background-color: #fff;
                    color: #4a4a4a;
                  }

                  &.submitting {
                    opacity: 0.6;
                    cursor: not-allowed;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Popup = () => {
  const data = useStaticQuery(graphql`
    query {
      popup: file(relativePath: { eq: "pop.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormShowing, setIsFormShowing] = useState(true);
  const [hasFormSubmitted, setHasFormSubmitted] = useState(false);

  const buttonRef = useRef(null);

  const popupTransitions = useTransition(isPopupOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    // check if popclosed is more than now
    if (localStorage.getItem("popupClosedTemp") !== null) {
      let popupTemp = JSON.parse(localStorage.getItem("popupClosedTemp"));
      if (Date.now() > popupTemp.expires) {
        localStorage.removeItem("popupClosedTemp");
      }
    }
    // there is no localStorage popup
    if (
      localStorage.getItem("popupClosedTemp") === null &&
      localStorage.getItem("popupClosed") === null
    ) {
      setTimeout(function() {
        setIsPopupOpen(true);
      }, 1000);
    }
  }, []);

  function handleFormClose() {
    // if someone closes the form, it should not bug them for 1 day
    const closedPopupOptions = {
      popupClosed: Date.now(),
      // 3 days
      expires: Date.now() + 1000 * 60 * 60 * 72,
    };

    localStorage.setItem("popupClosedTemp", JSON.stringify(closedPopupOptions));
    setIsPopupOpen(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!hasFormSubmitted) {
      setHasFormSubmitted(true);

      // put btn in loading state
      buttonRef.current.classList.add("submitting");
      buttonRef.current.textContent = "Submitting";
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyFmQxY12jqI4ujogrK7hSN8W7-g95lOVSuFyGG7nRPEzj2WTo/exec";

      fetch(scriptURL, { method: "POST", body: new FormData(e.target) })
        .then(response => {
          if (response.status === 200) {
            // show confirmation message
            setIsFormShowing(false);
            //  store token to prevent repeat popup on someone who has already submitted the form
            setTimeout(function() {
              setIsPopupOpen(false);
            }, 4000);

            localStorage.setItem("popupClosed", "completed");
          }
          console.log("Success!", response.status);
        })
        .catch(error => console.error("Error!", error.message));
    }
  }

  return (
    <PopupContainer>
      {popupTransitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div key={key} style={props} className="popup-bg">
              <div className="popup-inner-container">
                <Wrapper blockFlex className="popup-wrapper">
                  <div className="close-btn-container">
                    <button onClick={() => handleFormClose()}>
                      <X />
                    </button>
                  </div>
                  <div className="image-container">
                    <Img fluid={data.popup.childImageSharp.fluid} />
                  </div>
                  <div className="content-container">
                    <div className="inner-wrap">
                      <h3>Monthly Raffle</h3>
                      {isFormShowing ? (
                        <>
                          <p>
                            Every month we give away a $100 gift card to a lucky
                            subscriber. Join by signing up for our newsletter
                            below.
                          </p>

                          <div className="form-container">
                            <form onSubmit={e => handleFormSubmit(e)}>
                              <div className="input-container">
                                <input
                                  required
                                  name="email"
                                  placeholder="Enter Your Email Address"
                                  type="email"
                                />
                              </div>
                              <div className="input-container">
                                <button ref={buttonRef} type="submit">
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleFormClose()}
                                >
                                  Close
                                </button>
                              </div>
                            </form>
                          </div>
                        </>
                      ) : (
                        <p>
                          Thanks for submitting. We will contact you if you win
                          the raffle!
                        </p>
                      )}
                    </div>
                  </div>
                </Wrapper>
              </div>
            </animated.div>
          )
        );
      })}
    </PopupContainer>
  );
};

export default Popup;
