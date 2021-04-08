import React from 'react';
import { Link } from 'react-router-dom';
import './ItemDetails.scss';
import CheckIcon from '@material-ui/icons/Check';

const ItemDetails = ({ item, removeMathOperation, setComplite }) => (
  <div className="item-details__wrapper">
    <div className="item-details">
      <button
        type="button"
        className="item__key-remove"
        onClick={removeMathOperation}
      >
        <span>&#215;</span>
      </button>
      <Link
        to={`/edit/${item.id}`}
        className={`item__name${item.complite ? ' active' : ''}`}
      >
        {item.name || 'Item name'}
      </Link>
      <div className={`item__operation${item.complite ? ' active' : ''}`}>
        {item.mathOperation}
      </div>
      <button
        onClick={setComplite}
        type="button"
        className={`item__button-checked${item.complite ? ' active' : ''}`}
      >
        <CheckIcon fontSize="small" />
      </button>
    </div>
    <hr className="hr" />
  </div>
);

export default ItemDetails;
