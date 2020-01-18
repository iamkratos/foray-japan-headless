import React, { useContext } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { StoreContext } from "../../context/StoreContext";
import { TransitionMixin } from "../helpers";
import X from "../../images/x.inline.svg";

const CartContainer = styled(animated.section)`
  position: fixed;
  top: 0;
  right: 0;
  width: 35%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 1000;
  padding: 20px 20px 30px 30px;
  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    h3 {
      font-size: 19px;
      color: #000;
      flex: 1;
      margin-bottom: 0px;
    }
    .btn-container {
      flex: 1;
      text-align: right;

      button {
        border-radius: 50%;
        border: none;
        padding: 0px;
        height: 30px;
        width: 30px;
        position: relative;

        ${TransitionMixin(".25s")}
        &:hover {
          cursor: pointer;
          background-color: #fff;

          svg {
            stroke: #000;
          }

          span {
            color: #000;
          }
        }
        svg {
          stroke: #000;
          height: 27px;
          width: 27px;
          stroke-width: 1px;
          ${TransitionMixin(".25s")}
        }
        span {
          display: block;
          text-transform: uppercase;
          color: #fff;
          font-weight: bold;
          font-size: 11px;
          line-height: 1;

          ${TransitionMixin(".25s")}
        }
      }
    }
  }
  .cart-items-container {
    overflow-y: scroll;
    max-height: 69vh;
    min-height: 69vh;
    border-bottom: 1px solid #ccc;

    /* &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 1px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #000000;
      border: 2px solid #555555;
    } */

    .cart-item-container {
      margin-bottom: 30px;
      > .inner-wrap {
        display: flex;
        .image-container {
          img {
            /* max-width: 100px; */
            margin-bottom: 0px;
            max-height: 200px;
          }
        }

        .content-container {
          padding-top: 20px;
          > .inner-wrap {
            padding: 0 20px;

            .left-container {
              flex: 1;
              .action-buttons {
                margin-top: 15px;
                position: relative;
                left: -1px;
              }

              .decrement,
              .increment {
                background-color: transparent;
                border: 1px solid #000;
                padding: 0px;
                line-height: 1;
                font-size: 21px;
                height: 21px;
                width: 21px;
                border-radius: 50%;
                margin-right: 5px;
                position: relative;
                top: 2px;
                ${TransitionMixin(".25s")}

                &:hover {
                  cursor: pointer;
                  color: #fff;
                  background-color: #000;
                }
              }
              .increment {
                margin-right: 10px;
              }

              .remove-all {
                background-color: transparent;
                border: 1px solid #000;
                font-size: 10px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 5px 5px 3px;
                line-height: 1;
                border-radius: 4px;
                &:hover {
                  cursor: pointer;
                  color: #fff;
                  background-color: #000;
                }
              }
            }

            .right-container {
              margin-top: 15px;
              .price {
                font-size: 16px;
                color: #000;
                margin-bottom: 0px;
              }
            }

            h4 {
              margin-bottom: 10px;
              color: #000;
            }
            p {
              margin-bottom: 5px;
              font-size: 12px;
              font-weight: bold;
              line-height: 1;

              &:last-child {
                margin-bottom: 30px;
              }

              .label {
                color: #4a4a4a;
              }
              .value {
                color: #777;
                margin-left: 2px;
              }
            }
          }
        }
      }
    }
  }
  .cart-summary-container {
    padding-top: 25px;

    h2 {
      font-size: 19px;
      display: flex;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
      span {
        flex: 1;
        &.right {
          text-align: right;
        }
      }
    }
    p {
      font-size: 13px;
      font-weight: bold;
      margin: 15px 0 25px;
      text-align: left;
      line-height: 1;
      color: #777;
    }

    .btn-container {
      text-align: center;
      a {
        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
        background-color: #000;
        text-decoration: none;
        font-size: 14px;
        width: 100%;
        max-width: 100%;
        padding: 10px;
        display: inline-block;
        text-align: center;
      }
    }
  }
`;

const Cart = ({ style }) => {
  const {
    isCartOpen,
    toggleCartOpen,
    checkout,
    removeProductFromCart,
    updateQuantityInCart,
  } = useContext(StoreContext);
  console.log(checkout.lineItems);
  return (
    <CartContainer style={{ ...style }}>
      <div className="title-container">
        <h3>Your Cart</h3>
        <div className="btn-container">
          <button onClick={toggleCartOpen}>
            <X />
            {/* <span>Close</span> */}
          </button>
        </div>
      </div>
      <div className="cart-items-container">
        {checkout.lineItems.map(item => {
          console.log("cart here", item);
          return (
            <div className="cart-item-container" key={item.id}>
              <div className="inner-wrap">
                <div className="image-container">
                  <img src={item.variant.image.src} alt="" />
                </div>
                <div className="content-container">
                  <div className="inner-wrap">
                    <div className="left-container">
                      <h4>{item.title}</h4>
                      {item.variant.selectedOptions.map(option => {
                        return (
                          <p className={"variant " + option.name.toLowerCase()}>
                            <span class="label">{option.name}:</span>{" "}
                            <span className="value">{option.value}</span>
                          </p>
                        );
                      })}
                      <p>
                        <span class="label">Qty:</span>{" "}
                        <span class="value">{item.quantity}</span>
                      </p>

                      <div className="right-container">
                        <p className="price">${item.variant.price}</p>
                      </div>

                      <div className="action-buttons">
                        <button
                          className="decrement"
                          onClick={() =>
                            updateQuantityInCart(item, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <button
                          className="increment"
                          onClick={() =>
                            updateQuantityInCart(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="remove-all"
                          onClick={() => removeProductFromCart(item.id)}
                        >
                          Remove All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-summary-container">
        <div className="inner-wrap">
          <h2>
            <span>Total:</span>{" "}
            <span className="right">${checkout.totalPrice}</span>
          </h2>
          <p>Shipping, taxes, and discounts calculated at checkout.</p>
          <div className="btn-container">
            <a href="#">Check Out</a>
          </div>
        </div>
      </div>
    </CartContainer>
  );
};

export default Cart;
