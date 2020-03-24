import React, { useEffect, useState } from "react";
import { Notifications } from 'expo';

import LoginNavigator from "./navigation/LoginNavigator";
import * as Font from 'expo-font'
import { Provider } from "react-redux";
import store from "./store/index";
import { View } from "react-native";


export default function App() {

  const [loadFont, setLoadFont] = useState(null)
  useEffect(() => {
    Font.loadAsync({
      'Fredoka One': require('./assets/FredokaOne-Regular.ttf')
    })
      .then((result) => {
        setLoadFont(true)
      })
  })

  return (
    <Provider store={store}>
      {loadFont ? <LoginNavigator /> : <View></View>}
    </Provider>
  );
}
