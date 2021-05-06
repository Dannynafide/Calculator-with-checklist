import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FiX } from 'react-icons/fi';

import {
  closeSnackbar,
  isSnackbarOpen,
  selectSnackbarMessage,
  selectSnackbarType,
} from './snackbarSlice';

import { Container, Button } from './Snackbar.styled';

const Snackbar = ({ timeout }) => {
  const dispatch = useDispatch();

  // select the UI states from the redux store
  const SHOW = useSelector(isSnackbarOpen);
  const MESSAGE = useSelector(selectSnackbarMessage);
  const TYPE = useSelector(selectSnackbarType) || 'success';

  // convert the timeout prop to pass into the styled component
  const TIME = `${(timeout - 400) / 1000}s`;

  let TIMER;
  function handleTimeout() {
    TIMER = setTimeout(() => {
      dispatch(closeSnackbar());
    }, timeout);
  }

  function handleClose() {
    clearTimeout(TIMER);
    dispatch(closeSnackbar());
  }

  useEffect(() => {
    if (SHOW) {
      handleTimeout();
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [SHOW, TIMER, TYPE]);

  return (
    SHOW && (
      <Container time={TIME} type={TYPE}>
        <p>{MESSAGE}</p>
        <Button onClick={handleClose} type={TYPE}>
          <FiX />
        </Button>
      </Container>
    )
  );
};

Snackbar.propTypes = {
  timeout: PropTypes.number,
};

Snackbar.defaultProps = {
  timeout: 3000,
};

export default Snackbar;
