import React, { Component } from "react";
import Wrapper from "../org/Wrapper";
import styled from "styled-components";
import { media } from "../helpers";

const TopBarContainer = styled.div`
  background-color: #000;
  padding: 13px 0 10px;
  display: none;
  text-align: center;
  ${media.medium`display: block;`}
  p {
    margin: 0px;
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    font-family: "Nexa";
    line-height: 1;
  }
`;

export default class TopBar extends Component {
  render() {
    return (
      <TopBarContainer>
        <Wrapper>
          <div className="left-container">
            <p>FREE GROUND SHIPPING ON ALL ORDERS & FREE RETURNS</p>
          </div>
          <div className="right-container"></div>
        </Wrapper>
      </TopBarContainer>
    );
  }
}
