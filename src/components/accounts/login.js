import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Wrapper from "../org/Wrapper";
import { media, TransitionMixin } from "../helpers";

const LoginContainer = styled.section`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 40px;
  .login-wrapper {
    ${media.medium`max-width: 1080px;`}

    h2 {
      font-size: 17px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin: 0 0 5px;
    }

    p {
      &.small {
        font-size: 15px;
        margin: 0 0 10px;
      }

      &.error {
        margin: 5px 0 20px;
        font-weight: bold;
        font-size: 14px;
        color: red;
      }

      button {
        background-color: transparent;
        border: none;
        padding: 0 0 0 5px;
        text-decoration: underline;
        ${TransitionMixin(".25s")}
        &:hover {
          opacity: 0.7;
        }
      }
    }

    form {
      .input-container {
        display: flex;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0px;
        }

        input {
          flex: 1;
          padding-left: 10px;
          font-size: 17px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          height: 45px;
          line-height: 4;
        }
      }

      button {
        color: #fff;
        background-color: #222;
        border: 1px solid #222;
        border-radius: 4px;
        font-weight: bold;
        font-size: 13px;
        text-transform: uppercase;
        min-width: 100%;
        height: 38px;
        ${TransitionMixin(".25s")};

        &:hover {
          background-color: #fff;
          color: #222;
        }
      }
    }
  }
`;

function Login({
  customerAccessTokenCreate,
  setAccessTokenInput,
  setPasswordResetActive,
}) {
  // inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorText, setErrorText] = useState("");

  function setLSToken(token) {
    localStorage.setItem("aid", token);
  }

  return (
    <>
      <LoginContainer>
        <Wrapper className="login-wrapper">
          <h2>Login</h2>
          <p className="small">
            If this is your first time logging in, please
            <button onClick={() => setPasswordResetActive(true)}>
              click here
            </button>{" "}
            to reset your password.
          </p>
          <form
            onSubmit={e => {
              e.preventDefault();
              customerAccessTokenCreate({
                variables: {
                  input: {
                    email: emailInput,
                    password: passwordInput,
                  },
                },
              })
                .then(res => {
                  if (res.data.customerAccessTokenCreate.customerAccessToken) {
                    let {
                      accessToken,
                    } = res.data.customerAccessTokenCreate.customerAccessToken;
                    setLSToken(accessToken);
                    setAccessTokenInput(accessToken);
                  } else {
                    setErrorText("Invalid email/password");
                  }
                })
                .catch(e => {
                  console.log("heee");
                  console.log(e);
                });
            }}
          >
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
            </div>
            {errorText !== "" && <p className="error">{errorText}</p>}
            <button type="submit">Submit</button>
          </form>
        </Wrapper>
      </LoginContainer>
    </>
  );
}

export default Login;
