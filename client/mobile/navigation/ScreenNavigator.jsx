import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login-page"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
