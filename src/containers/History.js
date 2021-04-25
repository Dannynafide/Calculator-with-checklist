import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  selectCurrentToDo,
  removeMathOperation,
  setCompliteToDoItem,
} from '../features/calculator/calculatorSlice';
import Item from '../components/ItemHistory';
import ItemDetails from '../components/ItemHistoryDetails';

function History({ details }) {
  const dispatch = useDispatch();
  const toDo = useSelector(selectCurrentToDo);

  return (
    <StyledHistory>
      {!details
        ? toDo.map((item) => (
            <Item
              key={item.id}
              item={item}
              removeMathOperation={() => dispatch(removeMathOperation(item.id))}
            />
          ))
        : toDo.map((item) => (
            <ItemDetails
              key={item.id}
              item={item}
              removeMathOperation={() => dispatch(removeMathOperation(item.id))}
              setComplite={() => dispatch(setCompliteToDoItem(item.id))}
            />
          ))}
    </StyledHistory>
  );
}

const StyledHistory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 11px;
  letter-spacing: 1px;
  min-height: 70px;
`;

History.propTypes = {
  details: PropTypes.bool,
};

History.defaultProps = {
  details: false,
};

export default History;
