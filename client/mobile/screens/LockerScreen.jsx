import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import ubidots from '../services/ubidots'
import Constants from 'expo-constants'
import LottieView from 'lottie-react-native'

export default function LoginScreen() {
  const toggleLocker = (key) => {
    ubidots.post('/demoswitch/demo/values', {
      value: key
    })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  return (
    <View style={styles.container} >
      <LottieView style={styles.lottie} source={require('../assets/lockey.json')} autoPlay loop />
      <View style={styles.containerLocker}>
        {/* Lock */}
        <TouchableOpacity style={styles.lockBtnLock} onPress={() => toggleLocker(0)}>
          <Text style={styles.lockText}>LOCK</Text>
        </TouchableOpacity>
        {/* Unlock */}
        <TouchableOpacity style={styles.lockBtnUnlock} onPress={() => toggleLocker(1)}>
          <Text style={styles.lockText}>UNLOCK</Text>
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
    marginTop: Constants.statusBarHeight,
    height: "100%",
  },
  containerLocker: {
    width: "100%",
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
      height: 20,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 20,
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
      height: 20,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 20,
  },
  lockText: {
    fontFamily: "Fredoka One",
    letterSpacing: 2,
    color: "white",
    fontSize: 20
  }
});
