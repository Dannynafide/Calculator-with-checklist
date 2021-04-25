import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SingleItemTemplate from '../templates/ChangeNameTemplate';
import {
  selectCurrentToDoItem,
  setNameToDoItem,
} from '../features/calculator/calculatorSlice';

function ChangeItemNamePage({ match }) {
  const { id } = match.params;
  const item = useSelector((state) => selectCurrentToDoItem(state, id));

  if (!item) {
    return (
      <section>
        <p>Page not found!</p>
      </section>
    );
  }

  return (
    <SingleItemTemplate
      id={item.id}
      name={item.name}
      cost={item.cost}
      submit={setNameToDoItem}
    />
  );
}
ChangeItemNamePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChangeItemNamePage;
