import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import Wrapper from "../org/Wrapper";

import { media } from "../helpers";

const ORDERS_QUERY = gql`
  query fetchUserOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 5) {
        edges {
          node {
            id
            customerUrl
            processedAt
            statusUrl
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

const OrdersContainer = styled.section`
  .title-container {
    padding: 40px 0 20px;
    text-align: center;

    h2 {
      font-size: 21px;
      margin: 0;
      display: inline-block;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
  }

  .table-container {
    ${media.medium`max-width: 750px;`}

    th, td {
      text-align: center;
    }
  }

  h4 {
    text-align: center;
  }
`;

const Orders = ({ accessToken }) => {
  const { loading, error, data } = useQuery(ORDERS_QUERY, {
    variables: { customerAccessToken: accessToken },
  });
  if (error) return `Error! ${error.message}`;

  console.log("res 2", accessToken, data, loading);

  const orders = data && data.customer && data.customer.orders.edges;

  return (
    <OrdersContainer>
      <Wrapper>
        <div className="title-container">
          <h2>Order History</h2>
        </div>
        <Wrapper className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Total</th>
                <th>Tracking</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length > 0 &&
                orders.map(orderNode => {
                  let order = orderNode.node;
                  let orderDate = new Date(order.processedAt);
                  orderDate =
                    orderDate.toString().split(" ")[1] +
                    " " +
                    orderDate.toString().split(" ")[2] +
                    " " +
                    orderDate.toString().split(" ")[3];
                  const { statusUrl } = order;
                  return (
                    <tr>
                      <td>
                        <a target="_blank" href={statusUrl}>
                          #{order.orderNumber}
                        </a>
                      </td>
                      <td>{orderDate}</td>
                      <td>${order.totalPriceV2.amount}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {orders && orders.length == 0 && <h4>No orders yet!</h4>}
        </Wrapper>
      </Wrapper>
    </OrdersContainer>
  );
};

export default Orders;
