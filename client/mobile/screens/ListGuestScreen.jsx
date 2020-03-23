import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  AsyncStorage,
  FlatList
} from "react-native";

import axios from "../services/axios";
import ItemCard from "../components/itemCard";

function ListGuestScreen({ navigation }) {
  const [guests, setGuests] = useState([]);

  const getGuestList = async () => {
    const token = await AsyncStorage.getItem("token");
    const { data } = await axios.get("/guests", {
      headers: {
        token
      }
    });

    const guestList = data.filter(
      guest => guest.status || guest.status === false
    );

    guestList.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setGuests(guestList);
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

export default ListGuestScreen;
