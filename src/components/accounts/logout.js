import React from "react";
import styled from "styled-components";

import Wrapper from "../org/Wrapper";
import { TransitionMixin } from "../helpers";

const LogoutContainer = styled.div`
  margin-top: 10vh;
  .logout-wrapper {
    text-align: center;
    button {
      color: #fff;
      background-color: #222;
      border: 1px solid #222;
      border-radius: 4px;
      font-weight: bold;
      font-size: 13px;
      text-transform: uppercase;
      width: 100%;
      max-width: 220px;
      height: 38px;
      ${TransitionMixin(".25s")};

      &:hover {
        background-color: #fff;
        color: #222;
      }
    }
  }
`;

const Logout = ({ setAccessTokenInput }) => {
  function logout() {
    setAccessTokenInput(null);
    localStorage.removeItem("aid");
  }

  return (
    <LogoutContainer>
      <Wrapper className="logout-wrapper">
        <Wrapper>
          <button onClick={() => logout()}>Logout</button>
        </Wrapper>
      </Wrapper>
    </LogoutContainer>
  );
};

export default Logout;
