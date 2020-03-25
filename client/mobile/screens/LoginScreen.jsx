import React, { useState, useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  ToastAndroid,
} from "react-native";
import axios from "../services/axios";
import { useSelector, useDispatch } from "react-redux";
import {setLoadingTrue, setLoadingFalse} from '../actions/loadingActions'
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  // const [isLogin, setIsLogin] = useState(false)
  const isLoading = useSelector((state) => state.loadingReducer.isLoading)
  console.log(isLoading)
  const login = async () => {
    // setIsLogin(true)
    dispatch(setLoadingTrue())
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }

    let tokenExpo = await Notifications.getExpoPushTokenAsync();
    axios
      .post("/users/login", {
        username,
        password,
        tokenExpo
      })
      .then(({ data }) => {
        // setIsLogin(false)
        dispatch(setLoadingFalse())
        AsyncStorage.setItem("userId", String(data.user.id));
        AsyncStorage.setItem("token", data.token);
        setUsername('')
        setPassword('')
        navigation.navigate("Home");
        ToastAndroid.show(`Successfully Signed In`, ToastAndroid.SHORT);
      })
      .catch(err => {
        dispatch(setLoadingFalse())
        // setIsLogin(false)
        ToastAndroid.show(`Incorrect Username or Password`, ToastAndroid.SHORT);
      });
  };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");

    token ? navigation.navigate("Home") : null;
  };

  const changeVisibility = () => {
    setShow(!show);
  };

  useEffect(() => {
    checkLogin();
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {isLoading ?  <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        /> : <View></View>}
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
          secureTextEntry={show ? false : true}
        />
        <TouchableOpacity
          onPress={() => {
            changeVisibility();
          }}
        >
          <Feather
            name={show ? "eye" : "eye-off"}
            size={25}
            style={styles.feather}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle:{
    color: '#FFF'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputView: {
    flexDirection: "row",
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

  feather: {
    paddingTop: 11,
    paddingRight: 15
  },

  inputText: {
    flex: 1,
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
