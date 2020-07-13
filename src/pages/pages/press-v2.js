import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { navigate } from "gatsby";

const PressContainer = styled.div``;

const PressV2 = () => {
  useEffect(() => {
    navigate("/pages/press");
  }, []);

  return (
    <PressContainer>
      <h1>Test</h1>
    </PressContainer>
  );
};

export default PressV2;
