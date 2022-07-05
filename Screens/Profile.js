import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Image, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Icon } from 'react-native-elements';

const Profile = (props) => {

    console.log(props.profile)

    return(
        <View style = {styles.container}>
            
            <View style = {styles.header}>
                <View style = {styles.profilePic}>
                    <Image
                            style={styles.logo}
                            source={{
                            uri: props.profile
                            }}
                    />
                </View>
                <View style = {styles.credentials}>
                    <Text style = {styles.name}>
                        Name
                    </Text>
                    <Text style = {styles.headerStyle}>
                        {props.username}
                    </Text>
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginBottom : 30
                        }}
                        />
                    <Text style = {styles.name}>
                        Email 
                    </Text>
                    <TextInput style = {styles.headerStyle} value = {props.email} onChangeText = {(text) => setEmail(text) } />
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginBottom : 30
                        }}
                        />
                    <Text style = {styles.name}>
                        Phone Number
                    </Text>
                    <TextInput style = {styles.headerStyle} value = {props.phonenumber} onChangeText = {(text) => setPhonenumber(text)} />
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginBottom : 25
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    profilePic : {
        paddingLeft : 88,
        paddingRight : 190,
        marginBottom : 80
    },
    edit : {
        paddingTop : 40,
        paddingLeft : 285
    },
    name : {
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius : 40,
        marginBottom : 8
    },
    header : {
        paddingTop : 150,
        paddingLeft : 20,
        paddingRight : 20
    },
    headerStyle : {
        fontWeight : "bold",
        color : "#05c46b",
        fontSize : 16,
    },
    headerStyle1 : {
        fontWeight : "bold",
        color : "#05c46b",
        fontSize : 18,
    },
    analytics : {
        paddingLeft : 92,
        paddingRight : 10,
    },
    AnalyticsStyle : {
        fontWeight : "bold",
        fontSize : 18,
    },
    emailStyle : {
        fontWeight : "bold",
        fontSize : 15,
        marginBottom : 8
    },
    smallButtonText : {
        color : "white",
        fontWeight : "bold",
        fontSize  : 16
    },
    loginButton : {
        // paddingLeft : 70,
        // paddingRight : 100,
        marginBottom : 10
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
})

export default Profile;