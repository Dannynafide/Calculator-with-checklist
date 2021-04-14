import React from 'react';
import TextField from '@material-ui/core/TextField';

import './InputField.scss';

function InputField(props) {
  return (
    <TextField className="material-input" {...props}>
      {props.children}
    </TextField>
  );
}

export default InputField;
