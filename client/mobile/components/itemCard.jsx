import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import axios from '../services/axios'
import ubidots from '../services/ubidots'
import { GET_GUEST } from "../actions/guestAction";
import { useDispatch } from "react-redux";
import { FontAwesome } from '@expo/vector-icons'

// import Btn from "./Btn";

function generateStyle(color) {
    return StyleSheet.create({
        item: {
            backgroundColor: '#ffd074',
            borderRadius: 15,
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16
        },
        name: {
            fontSize: 25,
            color: "#5e2a00",
            textTransform: "capitalize",
            fontFamily: "Fredoka One"
        },
        phone: {
            fontSize: 18,
            color: "#5e2a00",
            fontFamily: "Fredoka One"
        },
        btnAccept: {
            borderRadius: 5,
            backgroundColor: "#00b894",
            alignItems: "center",
            marginVertical: 2,
            padding: 14,
            borderRadius: 100
        },
        btnDecline: {
            borderRadius: 5,
            backgroundColor: "#d63031",
            alignItems: "center",
            marginVertical: 2,
            marginRight: 10,
            padding: 14,
            borderRadius: 100
        },
        buttonView: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end"
        }
    });
}

function Item({ id, title, phoneNumber, status, type }) {
    const dispatch = useDispatch()

    const styles = generateStyle();

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
            .then(() => {
                dispatch(GET_GUEST(token))

                toggleLocker(status ? 1 : 0)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const toggleLocker = (key) => {
        ubidots
            .post('/demoswitch/demo/values', {
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
        <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <Text style={styles.name}>{title}</Text>
                    <Text style={styles.phone}>{phoneNumber}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    {status === null ? <View></View> : status ? <FontAwesome name="check-circle-o" size={65} style={{ color: '#00b894' }} /> : <FontAwesome name="times-circle-o" size={65} style={{ color: '#d63031' }} />}
                </View>
                {/* button */}
                {type === "request" ?
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.btnDecline} onPress={() => unlockLocker(false)}>
                            <Text style={{ fontFamily: "Fredoka One", color: "white" }}>Decline</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAccept} onPress={() => unlockLocker(true)}>
                            <Text style={{ fontFamily: "Fredoka One", color: "white" }}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </View>
        </View>
    );
}

export default Item;
