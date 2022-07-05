import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Button, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';


const Expense1 = (props) => {
    return(
        <View>
            <View style = {styles.date}>
                <Text style = {styles.dateText}>
                    {props.date}
                </Text>
            </View>
            <View style = {styles.wrapper}>
                <View style = {styles.item}>
                    <Text style = {{color : 'black'}}>
                        {props.title}
                    </Text>
                </View>
                <View style = {styles.item1}>
                    <Text style = {{color : 'black'}}>
                        {props.amount}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white"
    },
    date : {
        marginBottom : 10,
        paddingRight : 100,
        paddingLeft : 110
    },
    dateText:{
        fontWeight : "bold",
    },
    item: {
        backgroundColor: '#dcdcdc',
        padding : 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width : '70%',
        marginRight : 10
    },
    item1: {
        backgroundColor: '#dcdcdc',
        padding : 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width : '26%'
    },
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Expense1;