import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const processData = (e) => {
        console.log(email)
        console.log(password)
        {
            const credentials = {
                email : email,
                password : password
            }
            axios.post("https://62c1dbbb2a7fa33f7707dd52--luminous-melba-d1742f.netlify.app/.netlify/functions/server/login",credentials)
            .then(res => {if(res.data === 0){
                console.log("No User Has Been Found");
                ToastAndroid.show("No user has been found", 3000);
                setEmail(null);
                setPassword(null);
            } else if(res.data === false) {
                console.log("Invalid Data!");
                ToastAndroid.show("Invalid Data, Please enter correct data!", 3000);
                setEmail(null);
                setPassword(null);
            } else {
                console.log("Response Data", res.data);
                console.log("Login Successfull!");
                navigation.navigate("Bottom",{
                    userid : res.data
                })
            }})
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.headline}>
                <Text style={styles.headlineText}>
                    Tivity
                </Text>
            </View>
            <View style = {styles.inputFieldArea}>
                <View style={styles.inputView}>
                    <Icon
                        color="#333"
                        name="user"
                        type="font-awesome"
                        size={20}
                    />
                    <TextInput placeholder="Email" style={styles.inputField} value = {email} onChangeText = {email => setEmail(email)} />
                </View>
            </View>
            <View style = {styles.inputFieldArea}>
                <View style={styles.inputView}>
                    <Icon
                        color="#333"
                        name="lock"
                        type="font-awesome"
                        size={20}
                    />
                    <TextInput placeholder="Password" style={styles.inputField} value = {password} onChangeText = {password => setPassword(password)} />
                </View>
            </View>
            <View style = {styles.loginButton}>
                <TouchableOpacity style = {styles.smallButton} onPress = {() => processData()}>
                    <Text style = {styles.smallButtonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <View style = {styles.smallOr}>
                    <Text style = {styles.smallOrText}>
                        OR
                    </Text>
                </View>
                <TouchableOpacity style = {styles.smallButtonSignup} onPress = {() => navigation.navigate("Signin")}>
                    <Text style = {styles.smallButtonSignupText}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headline: {
        paddingTop : Dimensions.get('window').height / 2.9,
        alignItems : "center",
        marginBottom : 20
    },
    headlineText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    },
    inputFieldArea : {
        paddingLeft : 70,
        paddingRight : 100,
        marginBottom : 20
    },
    inputView: {
        width: '120%',
        height: 44,
        backgroundColor: "#f1f3f6",
        borderRadius: 8,
        paddingHorizontal: 18,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center"
    },
    loginButton : {
        paddingLeft : 70,
        paddingRight : 100,
        marginBottom : 20
    },
    smallButton : {
        width : '120%',
        backgroundColor : '#05bc46',
        paddingVertical : 10,
        paddingHorizontal : 0,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 4,
        elevation : 2,
        marginBottom : 10 
    },
    smallButtonSignup : {
        width : '120%',
        paddingVertical : 10,
        paddingHorizontal : 0,
        alignItems : "center",
        justifyContent : "center",
        borderColor : '#2C3A47',
        borderRadius : 4,
        borderWidth : 2,
        marginBottom : 10 
    },
    smallOr : {
        width : '120%',
        paddingVertical : 10,
        paddingHorizontal : 0,
        alignItems : "center",
        justifyContent : "center",
        marginBottom : 10
    },
    smallOrText : {
        color : "black",
        fontWeight : "bold",
        fontSize  : 16
    },
    smallButtonText : {
        color : "white",
        fontWeight : "bold",
        fontSize  : 16
    },
    inputField: {
        paddingHorizontal: 12
    }
});

export default Login;