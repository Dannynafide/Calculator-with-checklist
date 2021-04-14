import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reducers/userSlice';

function Login() {
  const dispatch = useDispatch();

  const logoutAction = () => {
    dispatch(logout());
  };

  return <button onClick={logoutAction}>Logout</button>;
}

export default Login;
