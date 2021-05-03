import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';

import AuthTemplate from '../../templates/AuthTemplate';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { emailAuthAsync } from './authSlice';
import { openSnackbar } from '../snackbar/snackbarSlice';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onFormSubmit = (e) => e.preventDefault() && false;

  async function onSignIn() {
    try {
      const resultAction = await dispatch(emailAuthAsync({ email, password }));
      unwrapResult(resultAction);
      setEmail('');
      setPassword('');

      dispatch(
        openSnackbar({ message: 'You have been logged in.', type: 'success' })
      );
      history.push('/');
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, type: 'error' }));
    }
  }
  return (
    <AuthTemplate label="Login">
      <StyledForm onSubmit={onFormSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={onEmailChanged}
        />
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={onPasswordChanged}
        />
        <StyledWrapperButton>
          <Button secondary onClick={onSignIn}>
            Sign in
          </Button>

          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </StyledWrapperButton>
      </StyledForm>

      <StyledDataTest>
        <div>Data for testing:</div>
        <div>Email: a@a.pl</div>
        <div>Password: test123</div>
      </StyledDataTest>
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
  margin-top: 10px;

  & :nth-child(1) {
    margin-top: 25px;
  }
`;
const StyledDataTest = styled.div`
  margin-top: 30px;
  color: ${(props) => props.theme.fontColor.secondary};
`;
