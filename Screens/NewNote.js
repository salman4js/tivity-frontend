import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import axios from 'axios';
import { NavigationHelpersContext } from '@react-navigation/native';
import Home2 from './Home2';

import { useNavigation } from '@react-navigation/native';


const New = ({route}) => {

    const navigation = useNavigation()

    const [yournotes, setYournotes] = useState();
    const [yourtitle, setYourtitle] = useState();

    const addNote = () => {
        const userId = route.params
        const user = JSON.stringify(userId.user).split('"').join('');

        if(yournotes == undefined || null) {
            ToastAndroid.show("Enter some values to the notes!", 3000)
        } else if(yournotes.length <=0 ){
            ToastAndroid.show("Enter some value in notes!", 3000)
        } else {
            const credentials = {
                note : yournotes,
                title : yourtitle
            }
            axios.post(`${host}/${user}/createnote`, credentials)
            .then(res => {
                if(res.data){
                    ToastAndroid.show("Notes Added", 3000)
                } else {
                    ToastAndroid.show("Some Error Occured, please try again later")
                }
            })
        }
    }

    return(
        <View style = {styles.container}>
                <View style = {styles.save}>
                    <TouchableOpacity onPress={() => addNote()}>
                        <Text style = {styles.textSave}>
                            Save
                        </Text>
                    </TouchableOpacity>
            </View>
           
            
            <View style = {styles.headline}>
                <TextInput placeholder =  "Title" style = {styles.textInput} editable = {true} value = {yourtitle} onChangeText = {(text) => setYourtitle(text)} />
            </View>
            <View style = {styles.headline1}>
                <TextInput placeholder= "Your Notes"style = {styles.textInput} multiline = {true} editable = {true} value = {yournotes} onChangeText ={(text) => setYournotes(text)}  />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white"
    },
    save : {
        width : '100%',
        paddingTop : 45,
        paddingLeft : 290,
    },
    textSave : {
        fontSize : 18,
        fontWeight : "bold",
        color : "#10ac84"
    },
    headline1 : {
        paddingTop : 20,
        paddingHorizontal : 20,
    },
    headline : {
        paddingTop : 20,
        paddingHorizontal : 20,
        fontWeight : "bold",
        fontSize : 18,
    }
})

export default New;
