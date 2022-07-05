import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Button, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import Notes from './Notes'

import { useNavigation } from '@react-navigation/native';

const Home2 = (props) => {

    const [notes, setNotes] = useState([]);

    const navigation = useNavigation()

    const getNotes = () => {
        axios.post(`${host}/${props.user}/allnotes`)
        .then(res => setNotes(res.data))
    }

    useEffect(() => {
        getNotes();
    })

    return(
        <View style = {styles.container}>
            <Text style = {styles.headline}>
                Notes Manager
            </Text>
           <ScrollView>
               {
                   notes.map((item,key) => {
                       const user_Id = key.key
                       return(
                           <Notes title = {item.title} note = {item.note} noteId = {item._id} />
                       )
                   })
               }
           </ScrollView>
           <View style = {styles.taskButton}>
                <TouchableOpacity style = {styles.smallButton} onPress = {() => navigation.navigate("New",{user : props.user})}>
                    <Text style = {styles.smallButtonText}>
                        Add Note!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white"
    },
    headline : {
        paddingTop : 80,
        paddingHorizontal : 20,
        fontWeight : "bold",
        fontSize : 18,
        marginBottom : 20
    },
    inputField: {
        color : '#333',
        flexWrap : 'wrap'
    },
    inputFieldArea: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    },
    inputView: {
        height: 44,
        backgroundColor: "#f1f3f6",
        borderRadius: 8,
        paddingHorizontal: 18,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center"
    },
    taskButton : {
        paddingLeft : 70,
        paddingRight : 100,
        marginBottom : 20
    },
    smallButton : {
        width : '120%',
        backgroundColor : '#05c46b',
        paddingVertical : 10,
        paddingHorizontal : 0,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 4,
        elevation : 2,
        marginBottom : 10 
    },
    smallButtonText : {
        color : "white",
        fontWeight : "bold",
        fontSize  : 16
    }
})


export default Home2;
