import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import './History.scss';
import {
  selectCount,
  removeMathOperation,
  setComplite,
} from '../../reducers/mathOperationsSlice';
import Item from './Item/Item';
import ItemDetails from './ItemDetails/ItemDetails';

function History({ details }) {
  const dispatch = useDispatch();
  const list = useSelector(selectCount);

  return (
    <div className="history">
      {!details
        ? list.map((item) => (
            <Item
              key={item.id}
              item={item}
              removeMathOperation={() => dispatch(removeMathOperation(item.id))}
            />
          ))
        : list.map((item) => (
            <ItemDetails
              key={item.id}
              item={item}
              removeMathOperation={() => dispatch(removeMathOperation(item.id))}
              setComplite={() => dispatch(setComplite(item.id))}
            />
          ))}
    </div>
  );
}

History.propTypes = {
  // history: PropTypes.arrayOf(PropTypes.string),
};

History.defaultProps = {
  // history: [''],
};

export default History;
