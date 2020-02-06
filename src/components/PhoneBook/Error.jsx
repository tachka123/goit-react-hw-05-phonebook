import React from 'react';
import Style from './error.module.css';

const Error = ({ text }) => {
  return <div className={Style.error}>{text}</div>;
};

export default Error;
