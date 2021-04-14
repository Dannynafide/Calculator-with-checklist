import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SingleItemTemplate from '../templates/SingleItemTemplate';
import { selectMathOperation } from '../reducers/mathOperationsSlice';

function SingleItemPage(props) {
  const { id } = props.match.params;

  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.mathOperations.history.find((el) => String(el.id) === String(id))
  );

  if (!item) {
    return (
      <section>
        <p className="missing-operation">Page not found!</p>
      </section>
    );
  }

  return (
    <SingleItemTemplate
      title="My trip to spain"
      id={item.id}
      itemName={item.name}
      mathOperation={item.mathOperation}
    />
  );
}

export default SingleItemPage;
