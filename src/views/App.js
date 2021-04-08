import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from '../routes';
import Calculate from './Calculate';
import Check from './Check';
import MainTemplate from '../templates/MainTemplate';
import store from '../store/store';
import SingleItemPage from './SingleItemPage';
// import Login from './Login';

const App = () => (
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route path={routes.check} component={Check} />
            <Route exact path={routes.home} component={Calculate} />
            <Route
              exact
              path={routes.editItemName}
              component={SingleItemPage}
            />
            {/* <Route exact path={routes.login} component={Login} /> */}
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
