import React from 'react';
import { ImgWrapper } from './styles';

const Images = ({ filename }) => {
  return (
    <li>
      <img src={`http://localhost:3050/${filename}`} />
    </li>
  );
};

export default Images;
