import React from "react";
import { animated } from "react-spring";
import styled from "styled-components";

const SearchOverlayContainer = styled(animated.div)`
  background-color: rgba(255, 255, 255, 0.75);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 350;
`;

const SearchOverlay = ({ style }) => {
  return (
    <SearchOverlayContainer style={{ ...style }}>
      overlay
    </SearchOverlayContainer>
  );
};

export default SearchOverlay;
