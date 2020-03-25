import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from "react-native";
import LottieView from "lottie-react-native";
import axios from "../services/axios";

function ListGuestScreen({ navigation }) {
  const logout = () => {
    Alert.alert(
      `Are you sure want to sign out?`,
      '',
      [
          {
              text: 'Cancel',
              onPress: () => console.log('Cancel'),
              style: 'cancel',
          },
          {
              text: 'OK', onPress: () => logoutConfirm()
          },
      ],
      { cancelable: false },
  )
    
  };

  const logoutConfirm = () => {
    axios
      .post("/users/logout")
      .then(({ data }) => {
        AsyncStorage.clear();
        navigation.navigate("login-page");
        ToastAndroid.show(`Successfully Signed Out`, ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show(`Failed Signing Out`, ToastAndroid.SHORT);
      });
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.container, alignItems: "center", flexDirection: 'column', justifyContent: 'center' }}>
          <LottieView
            style={styles.lottie}
            source={require("../assets/account.json")}
            autoPlay
            loop
          />
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
    color: "snow",
    fontFamily: "Fredoka One"
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
  },
  lottie: {
    width: 500,
    height: 500,
    position: 'absolute'
  }
});

export default ListGuestScreen;
