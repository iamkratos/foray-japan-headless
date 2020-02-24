/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, title, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  console.log(metaDescription);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <meta name="description" content={metaDescription} />

      {children}
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;

// <!-- COMMON TAGS -->
// <meta charset="utf-8">
// <title>Title Value</title>
// <!-- Search Engine -->
// <meta name="description" content="Page value">
// <meta name="image" content="image value">
// <!-- Schema.org for Google -->
// <meta itemprop="name" content="Title Value">
// <meta itemprop="description" content="Page value">
// <meta itemprop="image" content="image value">
// <!-- Open Graph general (Facebook, Pinterest & Google+) -->
// <meta name="og:title" content="Title Value">
// <meta name="og:description" content="Page value">
// <meta name="og:image" content="image value">
// <meta name="og:url" content="web site value">
// <meta name="og:site_name" content="site name">
// <meta name="og:type" content="website"></meta>
