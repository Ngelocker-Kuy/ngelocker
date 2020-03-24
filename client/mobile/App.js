import React, { useEffect, useState } from "react";
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { Notifications } from 'expo';
import { EvaIconsPack } from '@ui-kitten/eva-icons'

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
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        {loadFont ? <LoginNavigator /> : <View></View>}
      </ApplicationProvider>
    </Provider>
  );
}
