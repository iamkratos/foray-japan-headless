const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const productPages = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `);

  const collectionPages = await graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);

  const standardPages = await graphql(`
    {
      allShopifyPage {
        nodes {
          handle
        }
      }
    }
  `);

  const blogPosts = await graphql(`
    {
      allShopifyArticle(filter: { blog: { title: { eq: "TEAMFORAYGOLF" } } }) {
        edges {
          node {
            url
          }
        }
      }
    }
  `);

  // Product Pages
  productPages.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/products/${edge.node.handle}`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        handle: edge.node.handle,
      },
    });
  });

  // Collection Pages
  collectionPages.data.allShopifyCollection.edges.forEach(edge => {
    createPage({
      path: `/collections/${edge.node.handle}`,
      component: path.resolve("./src/templates/collection-basic.js"),
      context: {
        handle: edge.node.handle,
      },
    });
  });

  // Standard Pages
  standardPages.data.allShopifyPage.nodes.forEach(node => {
    createPage({
      path: `/pages/${node.handle}`,
      component: path.resolve("./src/templates/standard-page.js"),
      context: {
        handle: node.handle,
      },
    });
  });

  // Blog Posts
  blogPosts.data.allShopifyArticle.edges.forEach(node => {
    const link = node.node.url.replace(
      "https://ar.foraygolf.com/blogs/teamforaygolf/",
      ""
    );
    createPage({
      path: `/blogs/teamforaygolf/${link}`,
      component: path.resolve("./src/templates/blog-post.js"),
      context: {
        link: node.node.url,
      },
    });
  });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // Only update the `/app` page.
  if (page.path.match(/^\/accounts/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/accounts/*";
    // Update the page.
    createPage(page);
  }
};
