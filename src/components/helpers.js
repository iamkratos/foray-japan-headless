// Media Queries

import { css } from "styled-components";

export const sizes = {
  xxl: 1800,
  xl: 1600,
  laptop: 1440,
  large: 1200,
  medium: 992,
  small: 768,
  xsmall: 376,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

// ${media.large`font-size: 40px;`};

// Transitions
export const TransitionMixin = transitionSpeed => ` 
      -moz-transition:    ${transitionSpeed};
      -o-transition:      ${transitionSpeed};
      -webkit-transition: ${transitionSpeed};
      transition:         ${transitionSpeed};    
  `;

// ${TransitionMixin('.25s')}
