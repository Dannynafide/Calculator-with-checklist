import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ChangeNameTemplate from '../templates/ChangeNameTemplate';
import {
  selectExpense,
  setNameExpense,
} from '../features/calculator/calculatorSlice';

function ChangeExpenseNamePage({ match }) {
  const { id } = match.params;

  const item = useSelector((state) => selectExpense(state, id));

  if (!item) {
    return (
      <section>
        <p>Page not found!</p>
      </section>
    );
  }

  return (
    <ChangeNameTemplate
      id={item.id}
      name={item.name}
      cost={item.cost || null}
      submit={setNameExpense}
    />
  );
}
ChangeExpenseNamePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChangeExpenseNamePage;
