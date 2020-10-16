import React from "react";
import { StoreProvider } from "./../context/StoreContext";
import fetch from "isomorphic-fetch";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://foray-golf-dev.myshopify.com/api/2019-07/graphql.json",
  cache: new InMemoryCache(),
  fetch,
  headers: {
    "X-Shopify-Storefront-Access-Token": "5b871ba787e3d8597fcba89d138305fa",
    "Content-Type": "application/graphql",
    Accept: "application/json",
  },
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <StoreProvider>{element}</StoreProvider>
  </ApolloProvider>
);
