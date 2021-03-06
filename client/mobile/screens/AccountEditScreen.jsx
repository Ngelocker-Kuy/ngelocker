import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import LottieView from "lottie-react-native";
import axios from "../services/axios";
import { Feather } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("userId");

    await setId(id);

    const { data } = await axios.get(`users/${id}`, { headers: { token } });
    await setName(data.name);
    await setEmail(data.email);
  };

  const changeVisibility = () => {
    setShow(!show);
  };

  const updateUser = async () => {
    const token = await AsyncStorage.getItem("token");

    axios
      .put(
        `/users/${id}`,
        {
          name,
          password,
          email
        },
        {
          headers: {
            token
          }
        }
      )
      .then(({ data }) => {
        setPassword("");
        navigation.navigate("account");
        ToastAndroid.show(`Successfully Updated Data`, ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show(`${err.response.data.message}`, ToastAndroid.SHORT);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerLocker}>
        <Text style={styles.logo}>My Account</Text>
        <LottieView
          style={styles.lottie}
          source={require("../assets/account.json")}
          autoPlay
          loop
        />
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
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor="#343030a8"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="New Password"
            placeholderTextColor="#343030a8"
            secureTextEntry={show ? false : true}
          />
          <TouchableOpacity
            onPress={() => {
              changeVisibility();
            }}
          >
            <Feather
              name={show ? "eye" : "eye-off"}
              size={22}
              style={styles.feather}
            />
          </TouchableOpacity>
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
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
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
    flexDirection: "row",
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
    color: "snow",
    fontFamily: "Fredoka One"
  },
  lottie: {
    width: 500,
    height: 500,
    position: "absolute"
  },
  feather: {
    paddingTop: 14,
    paddingRight: 15
  }
});
