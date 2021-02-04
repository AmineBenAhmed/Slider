import React from 'react';
import { css, jsx } from '@emotion/react';

const Dot = ({ active }) => {
  return (
  <span
    css={css`
      padding: 6px;
      margin-right: 10px;
      cursor: pointer;
      border-radius: 50%;
      background: ${active ? 'black' : 'white'};
    `}
  />
)}

const Dots = ({ slides, activeSlide }) => {
  return (
  <div
    css={css`
      position: absolute;
      bottom: 25px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeSlide === i} />
    ))}
  </div>
)};

export default Dots;