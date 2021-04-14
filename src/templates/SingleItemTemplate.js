import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SingleItemTemplate.scss';
import { useHistory } from 'react-router-dom';
import { setName } from '../reducers/mathOperationsSlice';
import { routes } from '../routes/index';

export default function FlexTemplate({ id, title, itemName, mathOperation }) {
  const [nameItem, setNameItem] = useState(itemName);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(setName({ id, nameItem }));
    history.push(routes.check);
  };

  return (
    <form onSubmit={handleSubmit} className="single-item">
      <p className="title single-item__title">{title}</p>
      <input
        type="text"
        value={nameItem}
        className="single-item__input"
        placeholder="item name"
        onChange={(e) => setNameItem(e.target.value)}
      />
      <hr className="hr" />
      <p className="single-item__operation">{mathOperation}</p>

      <input type="submit" value="SAVE" className="single-item__btn" />
    </form>
  );
}
