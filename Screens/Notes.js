import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import axios from 'axios';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';

const Notes = (props) => {
    const navigation = useNavigation()

    const deleteNote = () => {
        const credentials = {
            noteId : props.noteId
        }
        axios.post("${host}/deletenote",credentials)
        .then(res => {
            console.log("Notes Deleted")
            ToastAndroid.show("Notes Deleted", 3000)
        })
    }

    return(
        <View style = {styles.inputFieldArea}>
            <View style = {styles.inputView}>
                <TouchableOpacity onPress = {deleteNote}>
                    <Icon
                        name = "ban"
                        type = "font-awesome"
                        size = {18}
                        color = '#10ac84'
                    />
                </TouchableOpacity>
                <TouchableOpacity style = {styles.touch} onPress = {() => navigation.navigate('Brief',{
                    notes : props.note,
                    title : props.title,
                    id : props.noteId
                })}>
                    {props.title != undefined ? <Text style = {styles.text}>
                        {props.title}
                    </Text> : <Text style = {styles.text}>
                        No title 
                    </Text>}
                </TouchableOpacity>
            </View>
            {/* <CheckBox
                containerStyle={{ marginLeft: 0, width: '100%' }}
                title={props.title != undefined ? props.title : "No Title"}
                checked={true}
                textStyle={{ color: '#10ac84' }}
                checkedColor='#1dd1a1'
                onPress = {() => navigation.navigate("Brief",{
                    notes : props.note,
                    title : props.title,
                    id : props.noteId
                })}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white"
    },
    inputFieldArea : {
        paddingLeft : 20,
        paddingRight : 20,
        marginBottom : 20,
    },
    text : {
        color : "#10ac84",
        fontWeight : "bold"
    },
    inputView: {
        width: '100%',
        height: 44,
        backgroundColor: "#f1f3f6",
        borderRadius: 8,
        paddingHorizontal: 18,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center"
    },
    touch : {
        paddingLeft : 20
    }
})

export default Notes;
