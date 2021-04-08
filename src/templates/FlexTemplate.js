import React from 'react';
import Display from '../components/Display/Display';
import './FlexTemplate.scss';

export default function FlexTemplate({ children }) {
  return (
    <div className="flexTemplate">
      <Display />
      {children}
    </div>
  );
}
