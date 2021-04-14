import React from 'react';

import './Button.scss';

function Button(props) {
  return (
    <button type="submit" className="auth__button" {...props}>
      {props.children}
    </button>
  );
}

export default Button;
