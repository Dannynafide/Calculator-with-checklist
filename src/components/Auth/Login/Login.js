import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import firebase from '../../../firebase';
import './Login.scss';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login">
      <h4 className="login__title">Sign in</h4>
      <form
        onSubmit={(e) => e.preventDefault() && false}
        className="login__form"
      >
        <div className="input-field">
          <InputField
            label="Email address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // inputProps={{ 'aria-label': 'description' }}
          />
        </div>
        <div className="input-field">
          <InputField
            label="Your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={login}>Sign in</Button>
        <Link className="link-button" to="/register">
          <button className="link-button__goTo" type="submit">
            Register
          </button>
        </Link>
      </form>
    </div>
  );

  async function login() {
    try {
      await firebase.login(email, password);
      props.history.replace('/');
    } catch (error) {
      alert(error.message);
    }
  }
}

export default withRouter(SignIn);
