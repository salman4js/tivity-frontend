import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import React, {useState} from 'react';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const Signin = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [phonenumber, setPhonenumber] = useState();

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    const processData = () => {

        if(username === undefined){
            ToastAndroid.show("Enter a valid username", 3000)
        } else if(regex.test(email) === false) {
            ToastAndroid.show("Enter a valid email", 3000)
        } else if(password === undefined) {
            ToastAndroid.show("Please provide a password", 3000);
        } else if(password !== confirmpassword){
            ToastAndroid.show("Password's doesn't match!", 3000)
        } else if(phonenumber === undefined){
            ToastAndroid.show("Please enter a valid PhoneNumber!", 3000);
        } else if(phonenumber.length < 10){
            ToastAndroid.show("Please enter a valid PhoneNumber!", 3000);
        } else {
            const credentials = {
                email : email,
                username : username,
                password : password,
                confirmpassword : confirmpassword,
                phonennumber : phonenumber
            }
            axios.post("https://62c1dbbb2a7fa33f7707dd52--luminous-melba-d1742f.netlify.app/.netlify/functions/server/signin", credentials)
            .then(res => {if(res.data === true){
                ToastAndroid.show("User Added to the database successfully!", 3000)
                setEmail(null);
                setUsername(null);
                setPassword(null);
                setPhonenumber(null);
                setConfirmpassword(null);
                navigation.navigate("Login")
            }else {
                ToastAndroid.show("Please check your internet connection" , 3000)
            }})
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.headline}>
                <Text style={styles.headlineText}>
                    Sign Up!
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
                    <TextInput placeholder="User name" style={styles.inputField} value = {username} onChangeText = {text => setUsername(text)} />
                </View>
            </View>
            <View style = {styles.inputFieldArea}>
                <View style={styles.inputView}>
                    <Icon
                        color="#333"
                        name="user"
                        type="font-awesome"
                        size={20}
                    />
                    <TextInput placeholder="Email" style={styles.inputField} value = {email} onChangeText = {text => setEmail(text)} />
                </View>
            </View>
            <View style = {styles.inputFieldArea}>
                <View style={styles.inputView}>
                    <Icon
                        color="#333"
                        name="user"
                        type="font-awesome"
                        size={20}
                    />
                    <TextInput placeholder="Phone Number" style={styles.inputField} value = {phonenumber} onChangeText = {text => setPhonenumber(text)} />
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
                    <TextInput placeholder="Password" style={styles.inputField} value = {password} onChangeText = {text => setPassword(text)} />
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
                    <TextInput placeholder="Confirm Password" style={styles.inputField} value = {confirmpassword} onChangeText = {text => setConfirmpassword(text)} />
                </View>
            </View>
            <View style = {styles.loginButton}>
                <TouchableOpacity style = {styles.smallButton} onPress = {() => processData()}>
                    <Text style = {styles.smallButtonText}>
                        Sign In
                    </Text>
                </TouchableOpacity>
                <View style = {styles.smallOr}>
                    <Text style = {styles.smallOrText}>
                        OR
                    </Text>
                </View>
                <TouchableOpacity style = {styles.smallButtonSignup} onPress = {() => navigation.navigate("Login")}>
                    <Text style = {styles.smallButtonSignupText}>
                        Log In
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
        paddingTop : Dimensions.get('window').height / 4.5,
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
        backgroundColor : '#05c46b',
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

export default Signin;