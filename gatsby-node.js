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
            title
            tags
            variants {
              availableForSale
              id
              image {
                originalSrc
              }
              price
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `);

  productPages.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/products/${edge.node.handle}`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        handle: edge.node.handle,
      },
    });
  });
};
