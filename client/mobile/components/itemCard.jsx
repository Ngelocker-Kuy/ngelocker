import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from "react-native";

function generateStyle(color) {
    return StyleSheet.create({
        item: {
            backgroundColor: color,
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16
        },
        title: {
            fontSize: 32,
            color: "snow"
        }
    });
}

function Item({ title, phoneNumber, status, type }) {
    let color

    if (status === null) {
        color = 'blue'
    } else if (status) {
        color = "green"
    } else {
        color = '#f12711'
    }

    const styles = generateStyle(color)

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title} {phoneNumber}</Text>
        </View>
    );
}

export default Item