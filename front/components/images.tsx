import React from 'react';

const Images = ({ filename }) => {
  return (
    <li>
      <img src={filename} />
    </li>
  );
};

export default Images;
