import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// import Btn from "./Btn";

function generateStyle(color) {
  return StyleSheet.create({
    item: {
      backgroundColor: color,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16
    },
    name: {
      fontSize: 28,
      color: "snow",
      textTransform: "capitalize"
    },
    phone: {
      fontSize: 24,
      color: "#f9d423"
    },
    btnAccept: {
      borderRadius: 5,
      backgroundColor: "#52c234",
      alignItems: "center",
      marginVertical: 2
    },
    btnDecline: {
      borderRadius: 5,
      backgroundColor: "#f83600",
      alignItems: "center",
      marginVertical: 2
    }
  });
}

function Item({ title, phoneNumber, status, type }) {
  let color;

  console.log(status);
  if (status === null) {
    color = "#83a4d4";
  } else if (status) {
    color = "green";
  } else {
    color = "#f12711";
  }

  const styles = generateStyle(color);

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.phone}>{phoneNumber}</Text>
      {/* button */}
      <TouchableOpacity style={styles.btnAccept}>
        <Text>
          <h3>Accept</h3>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnDecline}>
        <Text>
          <h3>Decline</h3>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Item;
