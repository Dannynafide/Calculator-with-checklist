import React from 'react';
import { Redirect } from 'react-router-dom';
import Display from '../components/Display/Display';
import './CalculatorTemplate.scss';
import Navigation from '../components/Navigation/Navigation';
import firebase from '../firebase';

function CalculatorTemplate({ children }) {
  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert('Please login first');
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Navigation />
      <div className="flexTemplate">
        <Display />
        {children}
      </div>
    </>
  );
}

export default CalculatorTemplate;
