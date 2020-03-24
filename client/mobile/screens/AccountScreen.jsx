import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from "react-native";
import axios from "../services/axios";

import ItemCard from "../components/itemCard";

function ListGuestScreen({ navigation }) {
  const logout = () => {
    axios
      .post("/users/logout")
      .then(({ data }) => {
        AsyncStorage.clear();
        navigation.navigate("login-page");
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.container, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("account-edit");
            }}
          >
            <Text style={styles.title}>Edit Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout} onPress={() => logout()}>
            <Text style={styles.title}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
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
  },
  btn: {
    marginTop: 30,
    width: "80%",
    backgroundColor: "#5e2a00",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 20
  },
  btnLogout: {
    marginTop: 30,
    width: "80%",
    backgroundColor: "#c31432",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 20
  }
});

export default ListGuestScreen;
