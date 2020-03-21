import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import store from './store/index'
import { LoginAdminPage, ListUsersPage, PermissionPage, RegisterUserPage, RegisterGuestPage, WaitingPage } from './containers'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/waiting" exact component={WaitingPage} />
          <Route path="/users" exact component={ListUsersPage} />
          <Route path="/permission" exact component={PermissionPage} />
          <Route path="/register/user" exact component={RegisterUserPage} />
          <Route path="/guest/:UserId" exact component={RegisterGuestPage} />
          <Route path="/" exact component={LoginAdminPage} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
