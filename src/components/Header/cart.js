import React, { useContext } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { StoreContext } from "../../context/StoreContext";

const CartContainer = styled(animated.section)`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 100;
  padding: 40px;
  .cart-items-container {
    overflow-y: scroll;
    max-height: 75vh;

    .inner-wrap {
      display: flex;
      .image-container {
        img {
          max-width: 60px;
        }
      }

      .content-container {
        p {
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: bold;
        }
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
      <h3>Cart</h3>
      <button onClick={toggleCartOpen}>Close Cart</button>
      <div className="cart-items-container">
        {checkout.lineItems.map(item => {
          console.log("cart here", item);
          return (
            <div key={item.id}>
              <div className="inner-wrap">
                <div className="image-container">
                  <img src={item.variant.image.src} alt="" />
                </div>
                <div className="content-container">
                  <h4>{item.title}</h4>
                  {item.variant.selectedOptions.map(option => {
                    return (
                      <p className={"variant " + option.name.toLowerCase()}>
                        {option.name + " " + option.value}
                      </p>
                    );
                  })}
                  <p>{item.quantity}</p>
                  <p>{item.variant.price}</p>
                  <button
                    onClick={() =>
                      updateQuantityInCart(item, item.quantity - 1)
                    }
                  >
                    - 1
                  </button>
                  <button
                    onClick={() =>
                      updateQuantityInCart(item, item.quantity + 1)
                    }
                  >
                    + 1
                  </button>
                  <button onClick={() => removeProductFromCart(item.id)}>
                    Remove All
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-summary-container">
        <h2>Total: ${checkout.totalPrice}</h2>
      </div>
    </CartContainer>
  );
};

export default Cart;
