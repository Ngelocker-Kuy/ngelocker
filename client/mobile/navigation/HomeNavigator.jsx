import React, { useEffect, useState } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { GET_GUEST } from "../actions/guestAction";
import { useDispatch, useSelector } from "react-redux";

import LockerScreen from "../screens/LockerScreen";
import ListRequestScreen from "../screens/ListRequestScreen";
import ListGuestScreen from "../screens/ListGuestScreen";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);

  const notifCount = useSelector(state => {
    const filtered = state.guestReducer.guests.filter(guest => {
      return guest.status === null && guest.UserId === id;
    });
    return filtered.length;
  });

  const getGuestList = async () => {
    const token = await AsyncStorage.getItem("token");
    let currentId = await AsyncStorage.getItem("userId");
    await setId(Number(currentId));

    dispatch(GET_GUEST(token));
  };

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Request") {
            return (
              <HomeIconWithBadge
                name={
                  focused
                    ? "ios-information-circle"
                    : "ios-information-circle-outline"
                }
                size={size}
                color={color}
                notifCount={notifCount}
              />
            );
          } else if (route.name === "Guest") {
            return (
              <Ionicons
                name={focused ? "ios-list-box" : "ios-list"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Locker") {
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
      <Tab.Screen name="Locker" component={LockerScreen} />
      <Tab.Screen name="Request" component={ListRequestScreen} />
      <Tab.Screen name="Guest" component={ListGuestScreen} />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "ios-person" : "md-person"}
              size={size}
              color={color}
            />
          )
        }}
      />
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
            width: 15,
            height: 15,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={props.notifCount} />;
}
