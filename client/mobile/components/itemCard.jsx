import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import axios from '../services/axios'
import { GET_GUEST } from "../actions/guestAction";
import { useDispatch } from "react-redux";

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

function Item({ id, title, phoneNumber, status, type }) {
    const dispatch = useDispatch()

    let color;

    if (status === null) {
        color = "#83a4d4";
    } else if (status) {
        color = "green";
    } else {
        color = "#f12711";
    }

    const styles = generateStyle(color);

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
                dispatch(GET_GUEST(token))
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <View style={styles.item}>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.phone}>{phoneNumber}</Text>
            {/* button */}
            {type === "request" ?
                <>
                    <TouchableOpacity style={styles.btnAccept} onPress={() => unlockLocker(true)}>
                        <Text>
                            <h3>Accept</h3>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDecline} onPress={() => unlockLocker(false)}>
                        <Text>
                            <h3>Decline</h3>
                        </Text>
                    </TouchableOpacity>
                </>
                : null
            }
        </View>
    );
}

export default Item;
