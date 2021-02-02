import React from 'react';

import Slider from 'Shared/slider';
import images from '../../enums/images';

export default () => {
  return (
    <>
    <Slider slides={images} autoPlay={3000} />
    </>
  )
}