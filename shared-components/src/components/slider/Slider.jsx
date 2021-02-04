
import React, { useState, useRef, useEffect } from 'react';

import SliderContent from './components/SliderContent';
import Slide from './components/Slide';
import Arrow from './components/Arrow';
import Dots from './components/Dots';

import './Slider.scss';

const getWidth = () => window.innerWidth;

const Slider = props => {
  const { slides } = props;

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 1000,
    _slides: [lastSlide, firstSlide, secondSlide]
  });

  const { translate, transition, activeSlide, _slides } = state;
  const autoPlayRef = useRef();
  const transitionRef = useRef();
  const resizeRef  = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const play = () => {
      //nextSlide() we can use it directly with currentIndex in the useEffect array
      autoPlayRef.current();
    };

    const smooth = e => {
      if(e.target.className.includes('SliderContent')) {
        transitionRef.current();
      }
    }

    const resize = () => {
      resizeRef.current();
    }

    const transitionEnd = window.addEventListener('transitionend', smooth);
    const onResize = window.addEventListener('resize', resize);

    let interval = null;
    if(props.autoPlay) interval = setInterval(play, props.autoPlay);

    return () => {
      window.removeEventListener('transitionend', onResize);
      window.removeEventListener('resize', transitionEnd);

      if(props.autoPlay) clearInterval(interval);
  }
  }, [props.autoPlay]);

    useEffect(() => {
      if (transition === 0) setState({...state, transition: 1000});
    }, [transition]);

      const handleResize = () => {
        setState({...state, translate: getWidth(), transition: 0});
      };

  const smoothTransition = () => {
    let _slides = [];

    // We're at the last slide.
    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide];
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth(),
    });
  };

const nextSlide = () =>
  setState({
    ...state,
    translate: translate + getWidth(),
    activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
  });

  const prevSlide = () =>
    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });

  return (
    <div className="slider">
      <SliderContent
        translate={translate}
        transitionTime={transition}
        width={getWidth() * _slides.length} //the width multiplied by the slides.length
        //because the slider display all the images in the window width by the multiplication
        // every image take the width of all the window
      >
        {_slides.map((slide, i) => (
          <Slide width={getWidth()} key={slide + i} content={slide} />
        ))}
      </SliderContent>

      { !props.autoPlay && (
        <>
          <Arrow direction="left" handleClick={prevSlide} />
          <Arrow direction="right" handleClick={nextSlide} />
        </>
      )}

      <Dots slides={slides} activeSlide={activeSlide} />
    </div>
  );
}

Slider.defaultProps = {
  slides: [],
  autoPlay: null
}

export default Slider