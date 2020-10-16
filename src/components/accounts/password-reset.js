import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

import { media, TransitionMixin } from "../helpers";

import Wrapper from "../org/Wrapper";

const RECOVER_PASSWORD_QUERY = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const PasswordResetContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 40px;
  .password-wrapper {
    ${media.medium`max-width: 1080px;`}

    h2 {
      font-size: 17px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin: 0 0 5px;
    }

    p {
      margin: 20px 0 0;
      font-weight: bold;
      font-size: 15px;
      &.small {
        font-size: 15px;
        margin: 0 0 10px;
        font-weight: normal;
      }

      &.error {
        margin: 5px 0 20px;
        font-weight: bold;
        font-size: 14px;
        color: red;
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

function PasswordReset() {
  const [emailInput, setEmailInput] = useState("");
  const [formResponse, setFormResponse] = useState("");

  const [customerRecover, { data }] = useMutation(RECOVER_PASSWORD_QUERY);

  function handleSubmit(e) {
    e.preventDefault();
    // customerRecover({ variables: { email: emailInput } });
  }

  return (
    <PasswordResetContainer>
      <Wrapper className="password-wrapper">
        <h2>Password Recovery</h2>
        <p className="small">
          Please enter the email you placed your order with.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            customerRecover({ variables: { email: emailInput } })
              .then(res => {
                console.log(res);
                if (
                  res.data.customerRecover &&
                  res.data.customerRecover.customerUserErrors.length === 0
                ) {
                  setFormResponse(
                    "Excellent! We've sent you a password reset link."
                  );
                } else {
                  setFormResponse(
                    res.data &&
                      res.data.customerRecover.customerUserErrors[0].message
                  );
                }
              })
              .catch(e => console.log(e));
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
          <button type="submit">Submit</button>
          {formResponse != "" && <p>{formResponse}</p>}
        </form>
      </Wrapper>
    </PasswordResetContainer>
  );
}

export default PasswordReset;
