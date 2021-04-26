import React from 'react';
import { backURL } from 'config/config';

const Images = ({ filename }) => {
  return (
    <li>
      <img src={`${backURL}/${filename}`} />
    </li>
  );
};

export default Images;
