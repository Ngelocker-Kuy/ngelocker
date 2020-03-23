import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";

import HomeNavigator from "../navigation/HomeNavigator";

const Stack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login-page"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: "Locker", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}