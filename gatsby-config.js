require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Foray Golf`,
    description: `Foray Golf is THE Authority for Women's Fashion Golf Apparel. Designed in New York made in the USA, Foray Golf uniquely offers stylish options for the course.`,
    author: `Foray Golf`,
    siteUrl: `https://foraygolf.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-source-google-sheets`,
      options: {
        spreadsheetId: `1jM_ZzwgpPmO58wwZOToZOSZUtGGkuIQqzI63gZMkbFM`,
        worksheetTitle: `Reviews`,
        credentials: require(`./review_credentials.json`),
      },
    },

    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: `ar.foraygolf.com`,
        accessToken: `5b871ba787e3d8597fcba89d138305fa`,
        verbose: true,
        paginationSize: 50,
        timeout: 2000000000,
      },
    },

    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || ``,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },

    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },

    {
      resolve: `gatsby-plugin-styled-components`,
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/fonts`,
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/fav-new.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-intercom`,
      options: {
        appId: "oyf25co4",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "AW-845962870", // Google Ads / Adwords / AW
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-89977702-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
    // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    // `gatsby-plugin-offline`,
    `gatsby-plugin-remove-serviceworker`,
  ],
};
