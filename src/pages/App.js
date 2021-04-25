import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { routes } from '../routes';

import LoginPage from '../features/auth/Login';
import RegisterPage from '../features/auth/Register';
import CalculatorHomePage from './CalculatorHomePage';
import CalculatorCheckPage from './CalculatorCheckPage';
import ChangeItemNamePage from './ChangeItemNamePage';
import ChangeExpenseNamePage from './ChangeExpenseNamePage';

import MainTemplate from '../templates/MainTemplate';
import PrivateRoute from '../components/PrivateRoute';

function App() {
  return (
    <Router>
      <MainTemplate>
        <Switch>
          <Route path={routes.login} component={LoginPage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <PrivateRoute
            exact
            path={routes.check}
            component={CalculatorCheckPage}
          />
          <PrivateRoute
            exact
            path={routes.home}
            component={CalculatorHomePage}
          />

          <PrivateRoute
            exact
            path={routes.editItemName}
            component={ChangeItemNamePage}
          />

          <PrivateRoute
            exact
            path={routes.editExpenseName}
            component={ChangeExpenseNamePage}
          />

          <Redirect to="/" />
        </Switch>
      </MainTemplate>
    </Router>
  );
}

export default App;
