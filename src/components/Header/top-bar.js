import React, { Component } from "react";
import Wrapper from "../org/Wrapper";
import styled from "styled-components";

const TopBarContainer = styled.div`
  background-color: #000;
  padding: 13px 0 10px;
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
            <p>
              FREE RETURNS ON ALL ORDERS & FREE 2 DAY SHIPPING ON ORDERS $150+
            </p>
          </div>
          <div className="right-container"></div>
        </Wrapper>
      </TopBarContainer>
    );
  }
}
