import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button type="button" className="slick-arrow slick-next" onClick={onClick}>
      <RiArrowRightSLine />
    </button>
  );
};

export default NextArrow;
