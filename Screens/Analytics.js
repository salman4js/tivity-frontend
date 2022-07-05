import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import axios from 'axios';
import Expense from './Expenses';
import Bar from './Bar';
import { useNavigation } from '@react-navigation/native';

const Analytics = (props) => {

    const navigation = useNavigation();

    const [balance, setBalance] = useState();
    const [entertainment, setEntertainment] = useState();
    const [food, setFood] = useState();
    const [rent, setRent] = useState();
    const [others, setOthers] = useState()
    const [groceries, setGroceries] = useState();

    const getBal = () => {
        axios.post(`${host}/${props.user}/received`)
        .then(data => {
            setBalance(data.data)
        })
    }


    useEffect(() => {
        getBal();
    }, [])

    const graphData = () => {
        {
            axios.post(`${host}/${props.user}/average`, {expense : "Entertainment"})
            .then(data => {
                console.log(data.data)
                setEntertainment(data.data)
            })
        }
        {
            axios.post(`${host}/${props.user}/average`, {expense : "Food"})
            .then(data => {
                console.log(data.data)
                setFood(data.data)
            })
        }
        {
            axios.post(`${host}/${props.user}/average`, {expense : "Rent"})
            .then(data => {
                console.log(data.data)
                setRent(data.data)
            })
        }
        {
            axios.post(`${host}/${props.user}/average`, {expense : "Groceries"})
            .then(data => {
                console.log(data.data)
                setGroceries(data.data)
            })
        }
        {
            axios.post(`${host}/${props.user}/average`, {expense : "Others"})
            .then(data => {
                console.log(data.data)
                setOthers(data.data)
            })
        }
    }

    useEffect(() => {
        graphData();
    }, [])


  return (
    <View style = {styles.container}>
        <View style = {styles.header}>
            <Text style = {styles.headerText}>
                Analytics
            </Text>
        </View>
        <View style = {styles.inputFieldArea}>
            <View style = {styles.inputView}>
                <View style = {styles.wrapper}>
                    <Text style = {styles.normalText}>
                        Account Balance
                    </Text>
                    <View style = {styles.balance1}>
                        <Text style = {styles.normalText}>
                            {balance}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
        <TouchableOpacity onPress = {() => navigation.navigate('Expense Analytics',{
            userid : props.user,
            entertainment : entertainment,
            food : food,
            groceries : groceries,
            rent : rent,
            others : others
        })}>
            <View style = {styles.inputFieldArea}>
                <View style = {styles.inputView}>
                    <Icon
                        color="#05c46b"
                        name="book"
                        type="font-awesome"
                        size={20}
                    />
                    <View style = {styles.analytics}>
                        <Text style = {styles.normalText}>
                            View Analytics
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        <Expense user = {props.user} />
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white",
    },
    analytics :{
        paddingLeft : 10
    },
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    header : {
        paddingTop : 50,
        justifyContent : "center",
        alignItems : "center",
        marginBottom : 10
    },
    balance1 : {
        paddingRight : 95,
        paddingLeft : 140,
    },
    headerText:{
        color : "#05c46b",
        fontWeight : "bold",
        fontSize : 18
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
    inputFieldArea: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    normalText:{
        fontWeight : "bold",
        fontSize : 15
    }
})

export default Analytics
