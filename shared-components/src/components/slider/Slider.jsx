
import React, { useState } from 'react';

import SliderContent from './components/SliderContent';
import Slide from './components/Slide';
import Arrow from './components/Arrow';
import Dots from './components/Dots';

import './Slider.scss';


const Slider = (props) => {
  const getWidth = () => window.innerWidth;

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 1000
  });

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      });
    }

      setState({
        ...state,
        activeIndex: activeIndex + 1,
        translate: (activeIndex + 1) * getWidth(),
      });
  }

  const prevSlide = () => {
      if (activeIndex === 0) {
        return setState({
          ...state,
          translate: (props.slides.length - 1) * getWidth(),
          activeIndex: props.slides.length - 1,
        });
      }
      setState({
          ...state,
          activeIndex: activeIndex - 1,
          translate: (activeIndex - 1) * getWidth(),
        });
  }

  return (
    <div className="slider">
      <SliderContent
        translate={translate}
        transitionTime={transition}
        width={getWidth() * props.slides.length} //the width multiplied by the slides.length
        //because the slider display all the images in the window width by the multiplication
        // every image take the width of all the window
      >
        {props.slides.map((slide, i) => (
          <Slide key={slide + i} content={slide} />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots slides={props.slides} activeIndex={activeIndex} />

    </div>
  );
}

export default Slider