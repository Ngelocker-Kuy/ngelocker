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
import Sidebar from './components/sidebar'
import { LoginAdminPage, ListUsersPage } from './containers/index'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/users" exact>
            <ListUsersPage />
          </Route>
          <Route path="/" exact>
            <LoginAdminPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
