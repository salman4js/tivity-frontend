import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Image, Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';
import axios from 'axios';

const Edit = ({route}) => {

    const id_user = route.params.userid

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [url, setUrl] = useState(null);
    const [userid, setUserid] = useState();

    const updateData = () => {
        const credentials = {
            username : username,
            email : email,
            phonenumber : phonenumber,
            profile : url
        }
        console.log(userid);
        {
            axios.post(`${host}/${userid}/updatedata`, credentials)
            .then(data => {
                console.log(data)
                ToastAndroid.show("Profile Updated successfully!", 3000)
            })
        }
    }

    const getPermission  = async () => {
        {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted'){
                alert("Permission Denied!")
            }
        }
    }
    
    useEffect(() => {
        setUserid(id_user);
    }, [])

    useEffect(() => {
        getPermission()
    },[])

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [4,3],
            quality : 1
        })
        if(!result.cancelled){
            setUrl(result.uri)
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.profilePic}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>
            <View style = {styles.loginButton}>
                <TouchableOpacity style = {styles.smallButton} onPress = {() => PickImage()}>
                    <Text style = {styles.smallButtonText}>
                        Change Picture!
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputFieldArea}>
                <View style={styles.inputView}>
                    <TextInput placeholder='Username' value = {username} onChangeText = {(text) => setUsername(text)} />
                </View>
            </View>
            <View style={styles.inputFieldArea}>
                <View style={styles.inputView}>
                    <TextInput placeholder='Email' value= {email} OnchangeText = {(text) => setEmail(text)} />
                </View>
            </View>
            <View style={styles.inputFieldArea}>
                <View style={styles.inputView}>
                    <TextInput placeholder='Phone Number' value = {phonenumber} OnchangeText = {(text) => setPhonenumber(text)} />
                </View>
            </View>
            <View style = {styles.loginButton}>
                <TouchableOpacity style = {styles.smallButton} onPress = {() => updateData()}>
                    <Text style = {styles.smallButtonText}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    inputFieldArea: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    loginButton : {
        paddingLeft : 70,
        paddingRight : 100,
        marginBottom : 20,
        marginTop : 20
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
    smallButton1 : {
        backgroundColor : '#05c46b',
        paddingVertical : 10,
        paddingHorizontal : 0,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 4,
        elevation : 2,
        marginBottom : 10 
    },
    profilePic: {
        marginTop : 40,
        paddingLeft: 130,
        paddingRight: 100,
        marginBottom: 20
    },
    smallButtonText : {
        color : "white",
        fontWeight : "bold",
        fontSize  : 16
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 40,
        marginBottom: 8
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
})

export default Edit;
