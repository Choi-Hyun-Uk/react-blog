import React from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button type="button" className="slick-arrow slick-prev" onClick={onClick}>
      <RiArrowLeftSLine />
    </button>
  );
};

export default PrevArrow;
