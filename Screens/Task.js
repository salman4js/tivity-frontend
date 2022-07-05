import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import axios from 'axios';

const Task = (props) => {
    const deleteTask = () => {
        console.log(props.user)
        const details = {
            taskId : props.user
        }
        axios.post(`https://62c1dbbb2a7fa33f7707dd52--luminous-melba-d1742f.netlify.app/.netlify/functions/server/deletetask`,details)
        .then(res => {
            console.log(res.data)
            ToastAndroid.show("Task Deleted!", 3000)
        })
    }
    return (
        <View style={styles.inputFieldArea}>
            <CheckBox
                containerStyle={{ marginLeft: 0, width: '100%' }}
                title={props.task}
                checked={true}
                textStyle={{ color: '#10ac84' }}
                checkedColor='#1dd1a1'
                onPress = {() => deleteTask()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputFieldArea: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        flexWrap: 'wrap'
    }
})

export default Task;