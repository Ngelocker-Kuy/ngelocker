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

import ItemCard from "../components/itemCard";

function ListGuestScreen(props) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.container, alignItems: "center" }}>
          <Text style={styles.logo}>List Guests</Text>
          <TouchableOpacity style={styles.btn} onPress={() => {props.navigation.navigate("account-edit")}}>
            <Text style={styles.title}>Edit Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout}>
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
