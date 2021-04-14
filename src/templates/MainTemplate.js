import React, { useState, useEffect } from 'react';
import { CircularProgress, ThemeProvider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';

import firebase from '../firebase';
import '../theme/globalStyle.scss';
import './MainTemplate.scss';
import { theme } from '../theme/materialUi';

function MainTemplate(props) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  return (
    <ThemeProvider theme={theme}>
      {firebaseInitialized !== false ? (
        <div className="calculator">
          <div className="app-bar">
            <span>My Trip to spain</span>
            <button className="app-bar__hamburger" onClick={logout}>
              <MenuIcon />
            </button>
            <span className="underlineTextt" />
          </div>

          {props.children}
        </div>
      ) : (
        <div id="loader">
          <CircularProgress />
        </div>
      )}
    </ThemeProvider>
  );

  async function logout() {
    await firebase.logout();
    props.history.push('/');
  }
}
export default withRouter(MainTemplate);
