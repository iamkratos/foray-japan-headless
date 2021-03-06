import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { StoreContext } from "../../context/StoreContext";
import { TransitionMixin, media } from "../helpers";
import X from "../../images/x.inline.svg";
import { useStaticQuery, graphql } from "gatsby";

const CartContainer = styled(animated.section)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 1000;
  padding: 20px 0px 30px 0px;
  ${media.medium`width: 35%;`}

  > .inner-wrap {
    max-height: 90vh;
    overflow-y: scroll;
    padding: 0px 20px 60px 30px;
    ${media.medium`max-height: 100%; overflow-y:auto;padding-bottom: 0px;`}
  }
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
    max-height: 62vh;
    min-height: 39vh;
    border-bottom: 1px solid #ccc;
    ${media.medium`max-height: 69vh;`}

    .tote-button {
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
      padding: 10px 0;
      line-height: 1;
      border-radius: 4px;
      width: 100%;
      margin-bottom: 20px;
      text-align: center;
      ${TransitionMixin(".25s")}

      span {
        font-size: 10px;
        margin-left: 10px;
      }

      &:hover {
        background-color: #000;
        color: #fff;
      }
      &.added {
        background-color: #000;
        color: #fff;
        cursor: not-allowed;
      }
    }

    .cart-item-container {
      margin-bottom: 30px;
      > .inner-wrap {
        display: flex;
        .image-container {
          max-width: 133px;
          img {
            /* max-width: 100px; */
            margin-bottom: 0px;
            max-height: 200px;
            min-width: 133px;
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

              &.final-sale {
                color: red;
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
        border: 1px solid #000;
        ${TransitionMixin(".25s")}

        &.disabled {
          opacity: 0.5;
          &:hover {
            background-color: #000;
            color: #fff;
            cursor: not-allowed;
          }
        }

        &:hover {
          background-color: #fff;
          color: #000;
          cursor: pointer;
        }
      }
    }
  }
`;

const Cart = ({ style }) => {
  const {
    toggleCartClose,
    addProductToCart,
    checkout,
    removeProductFromCart,
    removeMultipleProductsFromCart,
    updateMultipleQuantitiesInCart,
    updateQuantityInCart,
  } = useContext(StoreContext);

  async function addTote() {
    return addProductToCart(
      "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTkwNzQ2NjMxMzc5NQ=="
    );
  }

  const data = useStaticQuery(graphql`
    query {
      dresses: allShopifyCollection(filter: { title: { eq: "Dresses" } }) {
        edges {
          node {
            id
            products {
              id
              title
              tags
            }
          }
        }
      }
      sale: allShopifyCollection(filter: { title: { eq: "Final Sale" } }) {
        edges {
          node {
            id
            products {
              id
              title
              tags
            }
          }
        }
      }
    }
  `);

  let allDresses = data.dresses.edges[0].node.products;
  let allSaleItems = data.sale.edges[0].node.products;
  function handleRemoveAll(item) {
    // If the product is a dress, search for addon tag, then remove that product
    if (
      item.title.includes("Dress") &&
      !item.title.includes("Dresses") &&
      !item.title.includes("Girls")
    ) {
      let lineItemsArray = [];
      let addonProductSize =
        item.customAttributes[0] && item.customAttributes[0].value;
      let addonProductColor =
        item.customAttributes[1] && item.customAttributes[1].value;

      // console.log("the dress product is", item);
      // console.log("cart", checkout.lineItems);

      // Push initial product to remove array

      lineItemsArray.push(item.id);

      // Find checkout item
      checkout.lineItems.map(lineItem => {
        if (
          lineItem.title.includes("Add On") &&
          lineItem.variant.selectedOptions[0].value === addonProductColor &&
          lineItem.variant.selectedOptions[1].value === addonProductSize
        ) {
          // Get addon item
          let itemCheck = lineItem.variant.selectedOptions[0].value
            .toLowerCase()
            .replace(/ /g, "-");

          // If there is only one, we can remove all the items. If there is more, update quanity, then remove one
          if (itemCheck === addonProductColor && lineItem.quantity === 1) {
            lineItemsArray.push(lineItem.id);
            removeMultipleProductsFromCart(lineItemsArray);
            // console.log("remove both");
          } else {
            // console.log("only remove 1");
            // updateQuantityInCart(lineItem, lineItem.quantity - 1);
            // removeProductFromCart(item.id);
            let updatedLineItems = [
              {
                id: item.id,
                quantity: 0,
                variantId: item.variant.id,
              },
              {
                id: lineItem.id,
                quantity: lineItem.quantity - item.quantity,
                variantId: lineItem.variant.id,
              },
            ];
            updateMultipleQuantitiesInCart(updatedLineItems);
          }
        }

        return null;
      });
    } else {
      removeProductFromCart(item.id);
    }
  }

  function handleUpdateQuantity(item, currentAmount, plusOrMinus) {
    let newQuantity =
      plusOrMinus === "increment" ? currentAmount + 1 : currentAmount - 1;

    if (
      item.title.includes("Dress") &&
      !item.title.includes("Dresses") &&
      !item.title.includes("Girls")
    ) {
      // let lineItemsArray = [];
      let addonProductColor;
      let addonProductSize =
        item.customAttributes[0] && item.customAttributes[0].value;
      let dressProduct = allDresses.filter(dress => dress.title === item.title);
      // console.log("the dress product is", addonProductSize, dressProduct);

      // Find addon color variant
      dressProduct[0] &&
        dressProduct[0].tags.map(tag => {
          if (tag.includes("addon-shorts-")) {
            addonProductColor = tag.replace("addon-shorts-", "");
          }
          return null;
        });

      checkout.lineItems.map(lineItem => {
        if (
          lineItem.title.includes("Add On") &&
          lineItem.variant.selectedOptions[1].value === addonProductSize
        ) {
          let lineItemsArray = [
            {
              id: item.id,
              quantity: newQuantity,
              variantId: item.variant.id,
            },
            {
              id: lineItem.id,
              quantity:
                plusOrMinus === "increment"
                  ? lineItem.quantity + 1
                  : lineItem.quantity - 1,
              variantId: lineItem.variant.id,
            },
          ];
          updateMultipleQuantitiesInCart(lineItemsArray);
        }
        return null;
      });
    } else {
      updateQuantityInCart(item, newQuantity);
    }
  }

  function handleCheckout(e) {
    e.preventDefault();
    window.location.href = checkout.webUrl.replace(
      "https://foray-golf-dev.myshopify.com",
      "https://ar.foraygolf.com"
    );
  }

  return (
    <CartContainer style={{ ...style }}>
      <div className="inner-wrap">
        <div className="title-container">
          <h3>Your Cart</h3>
          <div className="btn-container">
            <button onClick={toggleCartClose}>
              <X />
              {/* <span>Close</span> */}
            </button>
          </div>
        </div>
        <div className="cart-items-container">
          {checkout.lineItems.length > 0 ? (
            checkout.lineItems.map(item => {
              let isFinalSale =
                allSaleItems.filter(product => product.title === item.title)
                  .length > 0;

              let isEmbroideryProduct =
                item.customAttributes[0] &&
                item.customAttributes[0].key === "Embroidery Design";
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
                          {item.variant.selectedOptions.map((option, index) => {
                            // check if special characters
                            let finalColor;
                            if (option.value === "BW") {
                              finalColor = "B&W";
                            } else if (option.value === "NB") {
                              finalColor = "N&B";
                            } else {
                              finalColor = option.value;
                            }
                            return (
                              <p
                                key={index}
                                className={
                                  "variant " + option.name.toLowerCase()
                                }
                              >
                                <span className="label">
                                  {option.value === "Left" ||
                                  option.value === "Right"
                                    ? "Glove"
                                    : option.name}
                                  :
                                </span>{" "}
                                <span className="value">{finalColor}</span>
                              </p>
                            );
                          })}
                          <p>
                            <span className="label">Qty:</span>{" "}
                            <span className="value">{item.quantity}</span>
                          </p>

                          {isFinalSale && (
                            <p className="final-sale">Final Sale</p>
                          )}

                          {isEmbroideryProduct && (
                            <p className="embroidery">
                              <span className="label">
                                {item.customAttributes[0].key}:
                              </span>{" "}
                              <span className="value">
                                {item.customAttributes[0].value}
                              </span>
                            </p>
                          )}

                          <div className="right-container">
                            {!item.title.includes("Add On") && (
                              <p className="price">${item.variant.price}</p>
                            )}
                          </div>
                          {!item.title.includes("Add On") && (
                            <div className="action-buttons">
                              <button
                                className="decrement"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item,
                                    item.quantity,
                                    "decrement"
                                  )
                                }
                              >
                                -
                              </button>
                              <button
                                className="increment"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item,
                                    item.quantity,
                                    "increment"
                                  )
                                }
                              >
                                +
                              </button>
                              <button
                                className="remove-all"
                                onClick={() => handleRemoveAll(item)}
                              >
                                Remove All
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-item-container">
              <div className="inner-wrap">
                <p>There are no items in your cart.</p>
              </div>
            </div>
          )}
        </div>
        <div className="cart-summary-container">
          <div className="inner-wrap">
            <h2>
              <span>Total:</span>{" "}
              <span className="right">${checkout.totalPrice}</span>
            </h2>
            <p>Shipping, taxes, and discounts calculated at checkout.</p>
            <div className="btn-container">
              <a
                className={checkout.lineItems.length === 0 ? "disabled" : ""}
                onClick={e => handleCheckout(e)}
              >
                {checkout.lineItems.length === 0
                  ? "No items in cart"
                  : " Check Out"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </CartContainer>
  );
};

export default Cart;
