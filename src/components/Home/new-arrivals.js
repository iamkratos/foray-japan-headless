import React from "react";
import styled from "styled-components";
import BasicProductGridItem from "../product/basic-product-grid-item";

import Wrapper from "../org/Wrapper";
import { media } from "../helpers";

const NewArrivalsContainer = styled.div`
  padding-top: 40px;

  .new-arrivals-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 4.5vw;

    > * {
      flex: 0 0 50%;
      ${media.small`flex: 0 0 33.33%;`}
      ${media.medium`flex: 0 0 25%;`}
      ${media.large`flex: 0 0 12.5%;`}
    }
  }
`;

const NewArrivals = ({ hpsProducts }) => {
  return (
    <NewArrivalsContainer>
      <Wrapper className="title-container">
        <h4>New Arrivals</h4>
      </Wrapper>
      <Wrapper className="new-arrivals-container">
        {hpsProducts.slice(0, 8).map((product, index) => {
          return <BasicProductGridItem product={product} key={index} />;
        })}
      </Wrapper>
    </NewArrivalsContainer>
  );
};

export default NewArrivals;
