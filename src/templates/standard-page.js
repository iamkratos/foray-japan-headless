import React from "react";
import { graphql } from "gatsby";
import BasicPage from "./pages/basic-page";
import CorporatePage from "./pages/corporate-page";
import FriendsOfForay from "./pages/friends-of-foray-page";

const StandardPage = ({ data }) => {
  const page = data.allShopifyPage.nodes[0];
  if (
    page.handle === "terms-of-use" ||
    page.handle === "sizing" ||
    page.handle === "privacy-policy" ||
    page.handle === "returns-exchange-policy"
  ) {
    return (
      <BasicPage
        fallbackImg={data.fallbackSeoImage.childImageSharp.original.src}
        page={page}
      />
    );
  } else if (page.handle === "corporate") {
    return (
      <CorporatePage
        fallbackImg={data.fallbackSeoImage.childImageSharp.original.src}
        page={page}
      />
    );
  } else if (page.handle === "friends-of-foray") {
    return (
      <FriendsOfForay
        fallbackImg={data.fallbackSeoImage.childImageSharp.original.src}
        page={page}
      />
    );
  } else {
    return <h1>{page.title}</h1>;
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
        bodySummary
      }
    }
    fallbackSeoImage: file(relativePath: { eq: "seoImages/home-page.jpg" }) {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
`;

export default StandardPage;
