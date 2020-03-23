import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  AsyncStorage,
  FlatList
} from "react-native";
import ItemCard from '../components/itemCard'
import axios from '../services/axios'
// import socket from '../services/socket'

function ListRequestScreen({ navigation }) {
  const [guests, setGuests] = useState([])

  // let UserId
  // AsyncStorage.getItem('userid', (err, result) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     UserId = result
  //   }
  // })


  const getGuestList = async () => {
    const token = await AsyncStorage.getItem('token')
    const { data } = await axios.get('/guests', {
      headers: {
        token
      }
    })

    const guestList = data.filter(guest => guest.status === null)

    guestList.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    setGuests(guestList)
  }

  useEffect(() => {
    getGuestList()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.container, alignItems: "center" }}>
        <Text style={styles.logo}>Request</Text>
      </View>
      <FlatList
        data={guests}
        renderItem={({ item }) =>
          <ItemCard
            title={item.name}
            status={item.status}
            id={item.id}
            type="request"
            phoneNumber={item.phoneNumber} />}
        keyExtractor={item => item.id}
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

export default ListRequestScreen;
