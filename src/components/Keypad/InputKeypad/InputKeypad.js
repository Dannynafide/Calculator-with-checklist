import React, { forwardRef } from 'react';
import './InputKeypad.scss';

const Input = forwardRef((props, ref) => {
  return <input className="inputKeypad" type="text" ref={ref} {...props} />;
});

export default Input;
