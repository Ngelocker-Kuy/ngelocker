import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Constant from "expo-constants";

import AccountScreen from "../screens/AccountScreen";
import AccountEditScreen from "../screens/AccountEditScreen";

const Stack = createStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          marginVertical: Constant.statusBarHeight
        }
      }}
    >
      <Stack.Screen
        name="account"
        component={AccountScreen}
        options={{
          headerTitle: "Account"
        }}
      />
      <Stack.Screen
        name="account-edit"
        component={AccountEditScreen}
        options={{
          headerTitle: "Edit Account"
        }}
      />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
