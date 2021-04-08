import React from 'react';
import './Item.scss';

const Item = ({ removeMathOperation, item }) => (
  <div className="item">
    <button
      type="button"
      className="item__key-remove"
      onClick={removeMathOperation}
    >
      <span>&#215;</span>
    </button>
    <div>{item.mathOperation}</div>
  </div>
);

export default Item;
