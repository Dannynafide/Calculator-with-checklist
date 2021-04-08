import React from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ progress }) => (
  <div className="progressBar-border">
    <div
      className="progressBar"
      style={{
        width: `${progress}%`,
      }}
    />
  </div>
);

export default ProgressBar;
