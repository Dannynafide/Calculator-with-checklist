import React from 'react';
import '../theme/globalStyle.scss';
import './MainTemplate.scss';
import Navigation from '../components/Navigation/Navigation';

export default function MainTemplate({ children }) {
  return (
    <div className="calculator">
      <Navigation />
      {children}
    </div>
  );
}
