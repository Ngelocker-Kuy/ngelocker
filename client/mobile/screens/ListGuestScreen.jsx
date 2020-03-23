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

function ListGuestScreen() {
  const guests = useSelector(state => {
    const guestList = state.guests.filter(guest => guest.status !== null);

    guestList.sort((a, b) => {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    });
    return guestList;
  });

  const dispatch = useDispatch();

  const getGuestList = async () => {
    const token = await AsyncStorage.getItem("token");
    dispatch(GET_GUEST(token));
  };

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.container, alignItems: "center" }}>
        <Text style={styles.logo}>Guest</Text>
      </View>
      <FlatList
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
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
