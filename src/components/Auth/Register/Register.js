import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import firebase from '../../../firebase';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quote, setQuote] = useState('');

  return (
    <div className="login">
      <div className="login__content">
        <h4 className="login__title">Register</h4>
        <br />
        <form
          onSubmit={(e) => e.preventDefault() && false}
          className="login__form"
        >
          <div className="input-field">
            <InputField
              label="Name"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="input-field">
            <InputField
              label="Email address"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-field">
            <InputField
              label="Your password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="input-field">
            <InputField
              label="Your Favorite Quote"
              type="text"
              name="quote"
              onChange={(e) => setQuote(e.target.value)}
              value={quote}
            />
          </div>
          <Button onClick={onRegister}>Register</Button>
          <Link className="link-button" to="/login">
            <button className="link-button__goTo" type="submit">
              Go back to login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );

  async function onRegister() {
    try {
      await firebase.register(name, email, password).then((cred) => {
        setName('');
        setEmail('');
        setPassword('');
        setQuote('');
      });
      await firebase.addQuote(quote);
      props.history.replace('/');
    } catch (error) {
      alert(error.message);
    }
  }
}

export default withRouter(Register);
