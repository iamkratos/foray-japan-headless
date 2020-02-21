module.exports = {
  siteMetadata: {
    title: `Foray Golf`,
    description: `Foray Golf is THE Authority for Women's Fashion Golf Apparel. Designed in New York made in the USA, Foray Golf uniquely offers stylish options for the course.`,
    author: `Sam Davidoff`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: `foray-golf-dev`,
        accessToken: `5b871ba787e3d8597fcba89d138305fa`,
        verbose: true,
        paginationSize: 50,
        timeout: 200000000,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
