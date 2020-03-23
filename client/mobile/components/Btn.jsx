import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

function Btn(props) {
  return (
    <TouchableOpacity {...props} style={{ ...styles.btn }}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginVertical: 4,
    backgroundColor: "#FF4E50"
  },
  text: {
    fontSize: 22,
    color: "white"
  }
});

export default Btn;
