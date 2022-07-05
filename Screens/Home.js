import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import axios from 'axios';
import Task from './Task';

const Home = (props) => {

    const [task, setTask] = useState([]);
    const [tasks, setTasks] = useState();

    const AddData = () => {
        console.log(tasks.length)
        if(tasks === undefined){
            ToastAndroid.show("Enter some value!", 3000)
        } else if(tasks.length <= 0){
            ToastAndroid.show("Enter some valid value!", 3000)
        } else {
            const credentials = {
                task : tasks
            }
            axios.post(`${host}/${props.user}/createtask`,credentials)
            .then(res => {
                console.log(res.data)
                ToastAndroid.show("Task Added Successfully!", 3000)
            })
        }
    }

    const getTasks = () => {
        console.log("Home", props.user)
        axios.post(`${host}/${props.user}/alltasks`)
            .then(res => {
                setTask(res.data)
            })
    }

    useEffect(() => {
        getTasks();
    })

    return (
        <View style={styles.container}>
            <View style={styles.headline}>
                <Text style={styles.headlineText}>
                    Task Manager
                </Text>
            </View>
            <View style = {styles.inputFieldArea}>
                <View style = {styles.inputView}>
                    <TextInput placeholder= "Tasks Here!" style = {styles.inputField} value = {tasks} onChangeText = {text => setTasks(text)} />
                </View>
            </View>
            <View style = {styles.taskButton}>
                <TouchableOpacity style = {styles.smallButton} onPress = {() => AddData()}>
                    <Text style = {styles.smallButtonText}>
                        Add Task!
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style = {styles.scroll}>
                {
                    task.map((item,key) => {
                        const user = key.key
                        return(
                            <Task task = {item.task} user = {item._id} />
                        )
                    })
                }
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headline: {
        paddingTop: 70,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    headlineText: {
        fontWeight: "bold",
        fontSize: 18
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
    inputField: {
        color : '#333',
        flexWrap : 'wrap'
    },
    inputFieldArea: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
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

export default Home;
