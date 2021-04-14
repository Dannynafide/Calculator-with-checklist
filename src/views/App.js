import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from '../routes';
import Calculate from './Calculate';
import Check from './Check';
import MainTemplate from '../templates/MainTemplate';
import store from '../store/store';
import SingleItemPage from './SingleItemPage';
import LoginPage from '../components/Auth/Login/Login';
import RegisterPage from '../components/Auth/Register/Register';

const App = () => (
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} component={Calculate} />
            <Route path={routes.check} component={Check} />
            <Route
              exact
              path={routes.editItemName}
              component={SingleItemPage}
            />
            <Route exact path={routes.login} component={LoginPage} />
            <Route exact path={routes.register} component={RegisterPage} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
