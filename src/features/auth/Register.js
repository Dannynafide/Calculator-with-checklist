import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import AuthTemplate from '../../templates/AuthTemplate';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';

import { registerAsync } from './authSlice';
import { openSnackbar } from '../snackbar/snackbarSlice';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSignUp() {
    try {
      const resultAction = await dispatch(registerAsync({ email, password }));
      unwrapResult(resultAction);
      setEmail('');
      setPassword('');

      dispatch(
        openSnackbar({ message: 'You have been registered.', type: 'success' })
      );
      history.push('/');
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, type: 'error' }));
    }
  }

  return (
    <AuthTemplate label="Register">
      <StyledForm onSubmit={(e) => e.preventDefault() && false}>
        <Input
          placeholder="Email address"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          placeholder="Your password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <StyledWrapperButton>
          <Button secondary onClick={onSignUp}>
            Register
          </Button>

          <Link to="/login">
            <Button>Go back to login</Button>
          </Link>
        </StyledWrapperButton>
      </StyledForm>
    </AuthTemplate>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledWrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
