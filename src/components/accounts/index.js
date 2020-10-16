import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Layout from "../layout";
import SEO from "../seo";
import Login from "./login";
import Logout from "./logout";
import Orders from "./orders";
import PasswordReset from "./password-reset";

import SingleOrder from "./single-order";

import { Router } from "@reach/router";

import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

const AccountsPageContainer = styled.div`
  > .title-container {
    padding: 40px 0;
    text-align: center;

    h1 {
      font-size: 32px;
      margin: 0;
    }
  }
`;

const AccountsPage = () => {
  //  orders
  const [accessTokenInput, setAccessTokenInput] = useState(null);
  const [passwordResetActive, setPasswordResetActive] = useState(false);

  const [customerAccessTokenCreate, { data }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    let aid = localStorage.getItem("aid");
    if (aid) {
      setAccessTokenInput(aid);
    }
  }, []);

  return (
    <Layout>
      <SEO title="Accounts" />
      <AccountsPageContainer>
        <div className="title-container">
          <h1>Accounts</h1>
        </div>
        {!accessTokenInput && !passwordResetActive && (
          <Login
            customerAccessTokenCreate={customerAccessTokenCreate}
            setAccessTokenInput={setAccessTokenInput}
            setPasswordResetActive={setPasswordResetActive}
          />
        )}
        {!accessTokenInput && passwordResetActive && (
          <PasswordReset
            customerAccessTokenCreate={customerAccessTokenCreate}
            setAccessTokenInput={setAccessTokenInput}
          />
        )}
        <Router basepath="/accounts">
          {accessTokenInput && (
            <SingleOrder accessToken={accessTokenInput} path="/orders/:id" />
          )}
          {accessTokenInput && (
            <Orders path="/" accessToken={accessTokenInput} />
          )}
        </Router>

        {accessTokenInput && (
          <Logout setAccessTokenInput={setAccessTokenInput} />
        )}

        {/* <Orders /> */}
      </AccountsPageContainer>
    </Layout>
  );
};

export default AccountsPage;
