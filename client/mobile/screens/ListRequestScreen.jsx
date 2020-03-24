import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_GUEST } from "../actions/guestAction";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  AsyncStorage,
  FlatList
} from "react-native";
import ItemCard from "../components/itemCard";

import socket from '../services/socket'
import Constants from 'expo-constants'

function ListRequestScreen() {
  const guests = useSelector(state => {
    const guestList = state.guests.filter(guest => guest.status === null);

    guestList.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return guestList;
  });

  const dispatch = useDispatch();

  const getGuestList = async () => {
    const token = await AsyncStorage.getItem("token");
    dispatch(GET_GUEST(token));
  };

  socket.on('guestUpdate', async () => {
    const token = await AsyncStorage.getItem("token");
    console.log('masuk', token)
    dispatch(GET_GUEST(token))
  })

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <View style={styles.container} >
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.container, alignItems: "center" }}>
          <Text style={styles.logo}>List Requests</Text>
        </View>
        <FlatList
          style={{ marginTop: 10 }}
          data={guests}
          renderItem={({ item }) => (
            <ItemCard
              title={item.name}
              status={item.status}
              id={item.id}
              type="request"
              phoneNumber={item.phoneNumber}
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
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: Constants.statusBarHeight,
    height: "100%",
  },
  logo: {
    fontFamily: "Fredoka One",
    letterSpacing: 1,
    fontSize: 45,
    color: "#5e2a00",
    marginBottom: 50
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32,
    color: "snow"
  }
});

export default ListRequestScreen;
