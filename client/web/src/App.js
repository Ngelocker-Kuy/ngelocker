import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import store from './store/index'
import {
  LoginAdminPage,
  ListUsersPage,
  PermissionPage,
  RegisterUserPage,
  RegisterGuestPage,
  WaitingPage,
  PrivateRoute
} from './containers'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginAdminPage} />
          <Route path="/guest/:UserId" exact component={RegisterGuestPage} />
          <Route path="/waiting" exact component={WaitingPage} />
          <Route path="/permission" exact component={PermissionPage} />
          <PrivateRoute>
            <Route path="/users" exact component={ListUsersPage} />
            <Route path="/register/user" exact component={RegisterUserPage} />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
