import React, { Component } from "react";
import Wrapper from "../org/Wrapper";
import styled from "styled-components";
import { media } from "../helpers";

import { Link } from "gatsby";

const TopBarContainer = styled.div`
  background-color: #000;
  padding: 13px 0 10px;
  display: none;
  text-align: center;
  height: 34px;
  ${media.medium`display: block;`}
  p {
    margin: 0px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    font-family: "Nexa";
    line-height: 1;

    a {
      color: #fff;
      margin-left: 5px;
    }
  }
`;

export default class TopBar extends Component {
  render() {
    return (
      <TopBarContainer>
        <Wrapper>
          <div className="left-container">
            <p>
              Shop For a Cause: Youth On Course
              <Link to="/collections/for-the-kids">$72 for Kids</Link>
            </p>
          </div>
          <div className="right-container"></div>
        </Wrapper>
      </TopBarContainer>
    );
  }
}
