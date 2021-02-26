/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react";
import { document } from "browser-monads";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import Popup from "./optin-popup";
import "./layout.css";
import LayoutStyles from "./Styles/LayoutStyles";

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <LayoutStyles>
        <Header dark={true} siteTitle={data.site.siteMetadata.title} />
        <div className="main-content-container">
          <main>{children}</main>
          <Footer dark={true} />
        </div>
        <Popup />
      </LayoutStyles>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
