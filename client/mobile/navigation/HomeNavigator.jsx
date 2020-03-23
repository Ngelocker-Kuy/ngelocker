import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LockerScreen from "../screens/LockerScreen";

import ListRequestScreen from "../screens/ListRequestScreen";
import ListGuestScreen from "../screens/ListGuestScreen";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "request") {
            return (
              <HomeIconWithBadge
                name={
                  focused
                    ? "ios-information-circle"
                    : "ios-information-circle-outline"
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === "guest") {
            return (
              <Ionicons
                name={focused ? "ios-list-box" : "ios-list"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "locker") {
            return (
              <Ionicons
                name={focused ? "ios-unlock" : "ios-lock"}
                size={size}
                color={color}
              />
            );
          }
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "black"
      }}
    >
      <Tab.Screen name="locker" component={LockerScreen} />
      <Tab.Screen name="request" component={ListRequestScreen} />
      <Tab.Screen name="guest" component={ListGuestScreen} />
    </Tab.Navigator>
  );
}

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            !
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
}
