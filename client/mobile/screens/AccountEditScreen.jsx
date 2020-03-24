import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
// import LottieView from "lottie-react-native";
import axios from "../services/axios";
export default function LoginScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  let id;
  let token;
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    id = await AsyncStorage.getItem("userid");
    token = await AsyncStorage.getItem("token");

    const { data } = await axios.get(`users/${id}`);
    console.log(data);
    setName(data.name);
    setPassword(data.password);
  };
  const updateUser = async () => {
    axios
      .put(
        `/users/${id}`,
        {
          name,
          password
        },
        {
          headers: {
            token
          }
        }
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerLocker}>
        <Text style={styles.logo}>My Account</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Name"
            placeholderTextColor="#343030a8"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            placeholderTextColor="#343030a8"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => updateUser()}>
          <Text style={styles.title}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    position: "relative"
  },
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  containerLocker: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontFamily: "Fredoka One",
    letterSpacing: 1,
    fontSize: 45,
    color: "#5e2a00",
    marginBottom: 50
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
  lockBtnLock: {
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
  lockBtnUnlock: {
    width: "80%",
    backgroundColor: "#ffd074",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
  lockText: {
    fontFamily: "Fredoka One",
    letterSpacing: 2,
    color: "white",
    fontSize: 20
  },
  btn: {
    marginTop: 30,
    width: "50%",
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
  title: {
    fontSize: 32,
    color: "snow"
  }
});
