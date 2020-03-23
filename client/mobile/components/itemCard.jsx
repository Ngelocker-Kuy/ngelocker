import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button,
    AsyncStorage
} from "react-native";
import axios from '../services/axios'

function generateStyle(color) {
    return StyleSheet.create({
        item: {
            backgroundColor: color,
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16
        },
        title: {
            fontSize: 18,
            color: "snow"
        }
    });
}

function Item({ id, title, phoneNumber, status, type }) {
    let color

    if (status === null) {
        color = 'blue'
    } else if (status) {
        color = "green"
    } else {
        color = '#f12711'
    }

    const styles = generateStyle(color)

    const unlockLocker = async (status) => {
        const token = await AsyncStorage.getItem('token')

        axios
            .put(`/guests/${id}`, {
                status
            }, {
                headers: {
                    token
                }
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title} {phoneNumber}</Text>
            {type === 'request' ? <Button title="open" onPress={() => unlockLocker(true)} /> : null}
            {type === 'request' ? <Button title="closed" onPress={() => unlockLocker(false)} /> : null}
        </View>
    );
}

export default Item