import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Button, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';


const Balance = (props) => {

    const [balance, setBalance] = useState()

    const getBal = () => {
        axios.post(`${host}/${props.user}/received`)
        .then(data => {
            setBalance(data.data)
        })
    }
    return(
        <View style = {styles.wrapper}>
            <View style={styles.balance}>
                <TouchableOpacity onPress = {() => getBal()}>
                    <Text style = {styles.balanceText}>
                        Check your balance here
                    </Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.balance1}>
                <Text style = {styles.balanceText}>
                    {balance}
                </Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    balanceText: {
        fontSize: 16,
        color: "#05c46b",
        textDecorationLine : "underline"
    },
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    balance: {
        paddingLeft: 0,
        paddingRight : 50,
        marginBottom : 8
    },
    balance1 : {
        paddingLeft : 60,
        marginBottom : 8

    }
})


export default Balance;
