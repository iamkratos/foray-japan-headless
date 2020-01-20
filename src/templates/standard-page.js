import React from "react";
import { graphql } from "gatsby";
import BasicPage from "./pages/basic-page";

const StandardPage = ({ data }) => {
  console.log(data);
  const page = data.allShopifyPage.nodes[0];
  if (
    page.handle === "terms-of-use" ||
    page.handle === "sizing" ||
    page.handle == "privacy-policy"
  ) {
    return <BasicPage page={page} />;
  }
};

export const query = graphql`
  query($handle: String!) {
    allShopifyPage(filter: { handle: { eq: $handle } }) {
      nodes {
        title
        url
        handle
        body
      }
    }
  }
`;

export default StandardPage;
