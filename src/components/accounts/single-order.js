import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

import Wrapper from "../org/Wrapper";

const ORDERS_QUERY = gql`
  query fetchUserOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 5) {
        edges {
          node {
            id
            customerUrl
            statusUrl
            processedAt
            successfulFulfillments {
              trackingCompany
              trackingInfo {
                number
                url
              }
            }
            totalPriceV2 {
              amount
            }
            email
            orderNumber
            shippingAddress {
              address1
              address2
              city
              firstName
              lastName
            }
            lineItems(first: 5) {
              edges {
                node {
                  quantity
                  title

                  variant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const SingleOrderContainer = styled.div``;

// id is being pulled from url
const SingleOrder = ({ accessToken, id }) => {
  const { loading, error, data } = useQuery(ORDERS_QUERY, {
    variables: { customerAccessToken: accessToken },
  });

  console.log(id);
  const allOrders = data && data.customer && data.customer.orders.edges;
  let order =
    allOrders &&
    allOrders.filter(orderNode => orderNode.node.id === id)[0].node;

  const { orderNumber, lineItems, customerUrl, statusUrl } = order || {};

  console.log(statusUrl);

  return (
    <SingleOrderContainer>
      <Wrapper>
        <div className="single-table-container">
          <div className="title-container">
            <h1>Order #{orderNumber}</h1>
            <a href={customerUrl}>Link</a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {lineItems &&
                lineItems.edges.map(itemNode => {
                  let item = itemNode.node;
                  return (
                    <tr>
                      <td>
                        {item.title}{" "}
                        {item.variant && (
                          <span className="variant">{item.variant.title}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    </SingleOrderContainer>
  );
};

export default SingleOrder;
