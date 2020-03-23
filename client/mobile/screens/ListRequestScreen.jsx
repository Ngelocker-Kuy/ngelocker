import React, { useState, useEffect } from "react";
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

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item"
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item"
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item"
//   }
// ];

// function DummyList() {
//   const arr = [];
//   for (let i = 0; i < 30; i++) {
//     arr.push({
//       id: i,
//       text: `Text ${i}`
//     });
//   }
//   return arr;
// }

// function Item({ title }) {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// }

function ListRequestScreen({ navigation }) {
  const [guests, setGuests] = useState([]);

  const getGuestList = async () => {
    const token = await AsyncStorage.getItem("token");
    const { data } = await axios.get("/guests", {
      headers: {
        token
      }
    });

    const guestList = data.filter(guest => guest.status === null);

    guestList.sort((a, b) => {
      const timeA = new Date(a.createdAt);
      const timeB = new Date(b.createdAt);
      return timeB.getTime() - timeA.getTime();
      // return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setGuests(guestList);
  };

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.container, alignItems: "center" }}>
        <Text style={styles.logo}>Request</Text>
      </View>
      <FlatList
        data={guests}
        renderItem={({ item }) => (
          <ItemCard
            title={item.name}
            status={item.status}
            type="request"
            phoneNumber={item.phoneNumber}
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

export default ListRequestScreen;
