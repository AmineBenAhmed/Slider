import React from 'react';
import { css, jsx } from '@emotion/react'


const SliderContent = ({ translate, transitionTime, width, children }) => (
  <div
    css={css`
      transform: translateX(-${translate}px);
      transition: transform ease-out ${transitionTime / 1000}s;
      height: 100%;
      width: ${width}px;
      display: flex;
      align-content: center;
    `}
  >
    { children }
  </div>
)
export default SliderContent;
