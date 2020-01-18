import React, { Component } from "react";
import styled from "styled-components";

const WrapperWrap = styled.div`
  max-width: 90vw;
  margin: 0 auto;
  &.md {
    max-width: 80vw;
  }
  &.sm {
    max-width: 70vw;
  }

  &.flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  &.align {
    align-items: center;
  }

  &.mt-sm {
    margin-top: 40px;
  }

  &.hide {
    display: none;
  }

  &.rel {
    position: relative;
  }
  &.shadow {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }

  &.shift-right {
    max-width: 100vw;
    /* padding-left: 6vw; */
  }
`;

export default class Wrapper extends Component {
  render() {
    const {
      size,
      children,
      flex,
      shiftRight,
      align,
      mt,
      hide,
      rel,
      shadow,
      activeClass,
      secondActiveClass,
      className,
    } = this.props;
    let classes = [];

    if (size != null) {
      classes.push(size);
    }
    if (flex != null) {
      classes.push("flex-wrap");
    }

    if (mt != null) {
      classes.push(mt);
    }

    if (rel != null) {
      classes.push(rel);
    }
    if (className != null) {
      classes.push(className);
    }
    if (shadow != null) {
      classes.push("shadow");
    }
    if (align != null) {
      classes.push("align");
    }
    if (activeClass != null) {
      classes.push("wrapper-container-one");
    }
    if (secondActiveClass != null) {
      classes.push("wrapper-container-two");
    }
    if (shiftRight != null) {
      classes.push("shift-right");
    }
    if (hide != null) {
      classes.push("hide");
    }

    classes = classes.join(" ");
    return <WrapperWrap className={classes}>{children}</WrapperWrap>;
  }
}
