import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Lockey</Text>
      <View style={styles.containerLocker}>
        {/* Lock */}
        <TouchableOpacity style={styles.lockBtnLock}>
          <Text style={styles.lockText}>Lock</Text>
        </TouchableOpacity>
        {/* Unlock */}
        <TouchableOpacity style={styles.lockBtnUnlock}>
          <Text style={styles.lockText}>Unlock</Text>
        </TouchableOpacity>
      </View>
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
  containerLocker: {
    width: "100%",
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
  lockBtnLock: {
    width: "80%",
    backgroundColor: "#F09819",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  lockBtnUnlock: {
    width: "80%",
    backgroundColor: "#1d976c",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  lockText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});
