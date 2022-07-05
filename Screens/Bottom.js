import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Home from './Home';
import Home2 from './Home2';
import Before from './Before';
import Analytics from './Analytics';



const Tab = createBottomTabNavigator();

const Bottom = ({ route }) => {


    const  TabA = () => {
        return (
            <View style={styles.container}>
                <Home user = {user} />
            </View>
        );
    }
    function TabB() {
        return (
            <View style={styles.container}>
                <Home2 user = {user} />
            </View>
        );
    }
    function TabC() {
        return (
            <View style = {styles.container}>
                <Analytics user = {user} />
            </View>
        );
    }

    function TabD() {
        return(
            <View style = {styles.container}>
                <Before user = {user} />
            </View>
        )
    }

    const userid = route.params
    const user = JSON.stringify(userid.userid).split('"').join('');
    console.log(user);


    return (
        <Tab.Navigator
            tabBarOptions={
                {
                    //Default Color is blue you can change it by following props
                    activeTintColor: '#05c46b',
                    // inactiveTintColor: '#ff6b81',
                    //Default Background Color is white you can change it by following props
                    // activeBackgroundColor: '#ced6e0',
                    // inactiveBackgroundColor: '#ced6e0',
                }
            }
        >
            <Tab.Screen
                name='Tasks'
                component={TabA}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='home' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='Notes'
                component={TabB}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='message' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='Expense'
                component={TabC}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='book' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={TabD}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='person' color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
    },
});


export default Bottom;