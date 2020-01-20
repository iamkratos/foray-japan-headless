const path = require("path");

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
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
};
