import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const Brief = ({navigation, route}) => {

    const [yournotes, setYournotes] = useState();
    const [yourtitle, setYourtitle] = useState();
    const [yourid, setYourid] = useState();

    const saveChanges = () => {
        const credentials = {
            note : yournotes,
            title : yourtitle,
            noteId : yourid
        }
        axios.post("${host}/noteupdater",credentials)
        .then(res => {
            console.log("Notes Udpated");
            ToastAndroid.show("Notes Updated", 3000)
        })
        .catch(err => {
            console.log(err);
            ToastAndroid.show("Some error occured, please try again later!", 3000)
        })
    }


    useEffect(() => {
        const notes = route.params.notes
        setYournotes(notes)

        const title = route.params.title
        setYourtitle(title);
        console.log(title);
        const id = route.params.id
        setYourid(id)
    }, [])

    return(
        <View style = {styles.container}>
                <View style = {styles.save}>
                    <TouchableOpacity onPress = {saveChanges}>
                        <Text style = {styles.textSave}>
                            Save
                        </Text>
                    </TouchableOpacity>
            </View>
           
            
            <View style = {styles.headline}>
                <TextInput placeholder =  "Title" style = {styles.textInput} editable = {true} value = {yourtitle} onChangeText = {(text) => setYourtitle(text)} />
            </View>
            <ScrollView style = {styles.headline1}>
                <TextInput placeholder= "Your Notes"style = {styles.textInput} multiline = {true} editable = {true} value = {yournotes} onChangeText ={(text) => setYournotes(text)}  />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white"
    },
    headline : {
        paddingTop : 20,
        paddingHorizontal : 20,
        fontWeight : "bold",
        fontSize : 18,
    },
    controller : {
        flexDirection : 'column'
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
    text : {
        fontWeight : "bold",
        fontSize : 18,
    },
    textInput : {
        color : "#10ac84",
        fontWeight : "bold",
        fontSize : 16
    }
})

export default Brief;
