import React, { useState, useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import axios from "../services/axios";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }

    // let tokenExpo = await Notifications.getExpoPushTokenAsync();
    console.log(status);
    // console.log(tokenExpo, "<<<");

    axios
      .post("/users/login", {
        username,
        password
        // tokenExpo
      })
      .then(({ data }) => {
        AsyncStorage.setItem("userId", String(data.user.id));
        AsyncStorage.setItem("token", data.token);

        console.log("masuk euy");
        navigation.navigate("Home");
      })
      .catch(err => {
        console.log(err.response.data.message);
        ToastAndroid.show(`${err.response.data.message}`, ToastAndroid.SHORT);
      });
  };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");

    token ? navigation.navigate("Home") : null;
  };

  useEffect(() => {
    checkLogin();
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: "100%", height: "40%", marginVertical: 30 }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#343030a8"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      {/* Password */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#343030a8"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 10
  },
  inputText: {
    paddingLeft: 20,
    height: 50,
    color: "black",
    borderRadius: 40,
    backgroundColor: "white",
    fontFamily: "Fredoka One",
    letterSpacing: 1
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#364e6b",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
  loginText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Fredoka One",
    letterSpacing: 5
  }
});
