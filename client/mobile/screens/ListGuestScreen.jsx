import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  AsyncStorage,
  FlatList
} from "react-native";
import { GET_GUEST } from "../actions/guestAction";
import { useDispatch, useSelector } from "react-redux";

import ItemCard from "../components/itemCard";
import Constants from "expo-constants";

function ListGuestScreen() {
  const [id, setId] = useState(0)

  const guests = useSelector(state => {
    const guestList = state.guests.filter(guest => {
      return guest.status !== null && guest.UserId === id
    });

    guestList.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return guestList;
  });

  const dispatch = useDispatch();

  const getGuestList = async () => {
    const token = await AsyncStorage.getItem("token");
    const currentId = await AsyncStorage.getItem("userId");

    await setId(Number(currentId))

    dispatch(GET_GUEST(token));
  };

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.container, alignItems: "center" }}>
          <Text style={styles.logo}>List Guests</Text>
        </View>
        <FlatList
          style={{ marginTop: 10 }}
          data={guests}
          renderItem={({ item }) => (
            <ItemCard
              title={item.name}
              phoneNumber={item.phoneNumber}
              status={item.status}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
    height: "100%"
  },
  logo: {
    fontFamily: "Fredoka One",
    letterSpacing: 1,
    fontSize: 45,
    color: "#5e2a00",
    marginBottom: 50
  },
  item: {
    backgroundColor: "#f12711",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32,
    color: "snow"
  }
});

export default ListGuestScreen;
