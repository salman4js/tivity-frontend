import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import axios from 'axios';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import Profile from './Profile';

const Before = (props) => {

    const [datas, setDatas] = useState([]);

    const navigation = useNavigation()

    const getProfile = () => {
        axios.post(`https://62c1dbbb2a7fa33f7707dd52--luminous-melba-d1742f.netlify.app/.netlify/functions/server/${props.user}/singleuser`)
        .then(data => {
            setDatas(data.data)
        })
    }

    useEffect(() => {
        getProfile()
    },[])

    const LoginPage = () => {
        navigation.navigate("Login")
    }

    return(
        <ScrollView style = {styles.container}>
            <View style = {styles.wrapper}>
                    <View style = {styles.logout}>
                        <TouchableOpacity onPress = {() => LoginPage()}>
                            <Text style = {styles.headerStyle1}>
                                LogOut
                            </Text>
                        </TouchableOpacity>
                    </View>
                <View style = {styles.edit}>
                    <TouchableOpacity onPress = {() => navigation.navigate("Edit",{
                        userid : props.user
                    })}>
                        <Text style = {styles.headerStyle1}>
                            Edit Info
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                datas.map((item,key) => {
                    
                    return(
                        <Profile keys = {key} username = {item.username} email = {item.email} phonenumber = {item.phonenumber} profile = {item.profile} />
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white"
    },
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerStyle1 : {
        fontWeight : "bold",
        color : "#05c46b",
        fontSize : 18,
    },
    edit : {
        paddingTop : 40,
        paddingLeft : 230
    },
    logout :{
        paddingTop : 40,
        paddingLeft : 10
    }
})

export default Before;