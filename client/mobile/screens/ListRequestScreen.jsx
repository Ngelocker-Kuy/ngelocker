import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_GUEST } from "../actions/guestAction";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  AsyncStorage,
  FlatList,
  Image,
} from "react-native";
import ItemCard from "../components/itemCard";

import socket from '../services/socket'
import Constants from 'expo-constants'

function ListRequestScreen() {
  const [id, setId] = useState(0)

  const guests = useSelector(state => {
    const guestList = state.guestReducer.guests.filter(guest => {
      return guest.status === null && guest.UserId === id
    });

    guestList.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return guestList;
  });

  const dispatch = useDispatch();

  const getGuestList = async () => {
    const token = await AsyncStorage.getItem("token");
    const currentId = await AsyncStorage.getItem("userId")

    await setId(Number(currentId))

    dispatch(GET_GUEST(token));
  };

  socket.on('guestUpdate', async () => {
    const token = await AsyncStorage.getItem("token");
    dispatch(GET_GUEST(token))
  })

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <View style={styles.container} >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.logo}>List Requests</Text>
        </View>
      <SafeAreaView style={styles.container}>
        {
          guests.length > 0 ?
          <FlatList
          style={{ marginTop: 10, height: 600 }}
          data={guests}
          renderItem={({ item }) => (
            <ItemCard
              title={item.name}
              status={item.status}
              id={item.id}
              type="request"
              phoneNumber={item.phoneNumber}
              created={item.createdAt}
            />
          )}
          keyExtractor={item => String(item.id)}
        /> 
          :  
          <Image
          source={require("../assets/nodata_800139.png")}
          style={{ width: "100%", height: "50%", marginBottom: 100 }}
          />
        }
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
