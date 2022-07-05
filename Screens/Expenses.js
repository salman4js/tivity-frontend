import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Button, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { getIconType, Icon } from 'react-native-elements';
import axios from 'axios';
import Modal from 'react-native-modal';
import Expense1 from './Expense1';
import {Picker} from '@react-native-picker/picker';

const Expense = (props) => {

    const [incomeTrue, setIncomeTrue] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState();

    const [expenses, setExpenses] = useState([]);
    
    const [showmode, setShowmode] = useState(false);

    const [type, setType] = useState("Income")

    const [title, setTitle] = useState();

    const [amount, setAmount] = useState();


    const getExpense = () => {
        axios.post(`https://62c1dbbb2a7fa33f7707dd52--luminous-melba-d1742f.netlify.app/.netlify/functions/server/${props.user}/allexpenseuser`)
            .then(res => {
                setExpenses(res.data)
            })
    }

    const processData = () => {

        if(title === undefined){
            ToastAndroid.show("Provide Title to this Expense!", 3000)
        } else if(title.length <= 0){
            ToastAndroid.show("Enter some title!", 3000)
        } else if(amount === undefined){
            ToastAndroid.show("Enter amount!", 3000)
        } else if(amount.length <= 0){
            ToastAndroid.show("Enter some amount!", 3000)
        } else {
            const credentials = {
                title: title,
                amount: amount,
                type : type,
                expense : selectedLanguage,
                date : new Date().toDateString()
            }
            axios.post(`https://62c1dbbb2a7fa33f7707dd52--luminous-melba-d1742f.netlify.app/.netlify/functions/server/${props.user}/addexpense`,credentials)
            .then(data => {
                //console.log(data)
                ToastAndroid.show("Added successfull!", 3000)
            })
        }
    }

    const toggleMode = () => {
        setShowmode(!showmode)
    }

    const showPicker = () => {
        setIncomeTrue(true)
    }

    const picker = () => {
        setIncomeTrue(false)
    }
    

    useEffect(() => {
        getExpense();
    })

    return (

        <View style={styles.container}>
            <View style={styles.modal}>
                <Modal isVisible={showmode}>
                    <View style={styles.wrapper}>
                        <Text style={styles.modeText}>
                            Hey there!
                        </Text>
                        <View style={styles.addFunc1}>
                            <TouchableOpacity onPress={toggleMode}>
                                <Text style={styles.addText}>
                                    x
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInput placeholder='Title Here' style={styles.textInputMode} onChangeText={(text) => setTitle(text)} />
                    <TextInput placeholder='Enter Amount' style={styles.textInputMode} onChangeText={(text) => setAmount(text)} />

                    <View style={styles.wrapper}>
                        <TouchableOpacity style={styles.smallButton} value={title} onPress={() => setType("Income") & picker()}>
                            <Text style={styles.smallButtonText}>
                                Income
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButton} value={amount} onPress={() => setType("Expense") & showPicker()}>
                            <Text style={styles.smallButtonText}>
                                Expense
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        incomeTrue && 
                        <View style = {styles.picker}>
                                <Picker
                                        selectedValue={selectedLanguage}
                                        style  = {{color : "white", fontWeight : "bold"}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedLanguage(itemValue)
                                        }>
                                        <Picker.Item label="Entertainment" value="Entertainment" />
                                        <Picker.Item label="Food" value="Food" />
                                        <Picker.Item label = "Groceries" value = "Groceries" />
                                        <Picker.Item label = "Rent" value = "Rent" />
                                        <Picker.Item label = "Others" value = "Others" />
                                </Picker>
                            </View>
                    }
                   
                    <View style={styles.submit1}>
                        <Text style={styles.typeExpenses}>
                            Expense Type : {type}
                        </Text>
                    </View>
                    <View style={styles.submit}>
                        <TouchableOpacity style={styles.submitButton} onPress={processData}>
                            <Text style={styles.smallButtonText}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.headline}>
                    <Text style={styles.headlineText}>
                        Expense Tracker
                    </Text>
                </View>
                <View style={styles.addFunc}>
                    <TouchableOpacity onPress={toggleMode}>
                        <Text style={styles.addText}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {
                    expenses.map((item, key) => {
                        const keys = key;
                        return (
                            <Expense1 title={item.title} amount={item.amount} date = {item.date} />
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
        backgroundColor: "white",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    headline: {
        marginBottom: 20,
        width: '70%',
        marginRight: 29
    },
    picker : {
        backgroundColor: '#05c46b',
        borderRadius : 10,
        marginTop : 10
    },
    smallButton: {
        width: '40%',
        backgroundColor: '#05c46b',
        paddingVertical: 10,
        paddingHorizontal: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 2,
        marginBottom: 10,
        marginRight: 65
    },
    
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitButton: {
        width: '50%',
        backgroundColor: '#05c46b',
        paddingVertical: 10,
        paddingHorizontal: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 2,
        marginBottom: 10,
        marginRight: 65
    },
    typeExpenses: {
        color: "#05c46b",
        fontWeight: 'bold',
        fontSize: 16
    },
    submit: {
        marginTop: 20,
        marginLeft: 110
    },
    submit1: {
        marginTop: 20,
        marginLeft: 90
    },
    smallButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    headlineText: {
        fontWeight: "bold",
        fontSize: 18
    },
    addFunc: {
        backgroundColor: '#05c46b',
        borderRadius: 50,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '20%'
    },
    addFunc1: {
        backgroundColor: '#05c46b',
        borderRadius: 90,
        padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft: 207,
        width: '10%'
    },
    addText: {
        fontWeight: 'bold',
        fontSize: 22
    },
    modal: {

    },
    modeText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    },
    textInputMode: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 10,
        marginBottom: 20
    },
    modalWrapper: {
        width: '40%',
        padding: 1,
        backgroundColor: "#05c46b",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 69,
        borderRadius: 10
    },
    modalWrapper1: {
        width: '40%',
        padding: 1,
        backgroundColor: "#05c46b",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    }

})

export default Expense;