import React from "react";

import LoginNavigator from "./navigation/LoginNavigator";
import { Provider } from "react-redux";
import store from "./store/index";

export default function App() {
  return (
    <Provider store={store}>
      <LoginNavigator />
    </Provider>
  );
}
