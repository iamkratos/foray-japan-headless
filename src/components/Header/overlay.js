import React, { useContext } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { StoreContext } from "../../context/StoreContext";

const OverlayContainer = styled(animated.div)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 700;
`;

const Overlay = ({ style }) => {
  const { toggleCartOpen } = useContext(StoreContext);
  return (
    <OverlayContainer
      onClick={toggleCartOpen}
      style={{ ...style }}
    ></OverlayContainer>
  );
};

export default Overlay;
