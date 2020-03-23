import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import axios from '../services/axios'

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    axios
      .post('/users/login', {
        username,
        password
      })
      .then(({ data }) => {
        AsyncStorage.setItem('userid', data.user.id)
        AsyncStorage.setItem('token', data.token)

        navigation.navigate('Home')
      })
      .catch(err => {
        console.log(err.response, "<")
      })
  }

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token')

    token ? navigation.navigate('Home') : null
  }

  useEffect(() => {
    checkLogin()
  })

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Lockey</Text>
      {/* Username */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      {/* Password */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      {/* forgot password */}
      {/* <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity> */}
      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {/* Signup Button */}
      {/* <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});
