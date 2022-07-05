import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import axios from 'axios';
import {BarChart} from "react-native-chart-kit";

const Bar = ({route}) => {

    const entertainment = route.params.entertainment
    const food = route.params.food
    const groceries = route.params.groceries
    const rent = route.params.rent
    const others = route.params.others

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    const data = {
        labels: ["Entertainment", "Food", "Groceries", "Rent", "Others"],
        datasets: [
          {
            data: [entertainment, food, groceries, rent, others]
          }
        ]
      };
  return (
    <View style = {styles.container}>
        <View style = {styles.text}>
            <Text style = {styles.textStyle}>
                Average Out Of Total Income!
            </Text>
        </View>
        <View style = {styles.mainwrap}>
            <BarChart
                data={data}
                width={Dimensions.get('window').width }
                height={Dimensions.get('window').height - 100}
                yAxisLabel="%"
                chartConfig={chartConfig}
                verticalLabelRotation={90}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#1E2923",
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#08130D",
        alignItems : "center",
    },
    text:{
        marginTop : 20
    },
    mainwrap : {
        marginTop : 20
    },
    textStyle : {
        color : "white",
        fontWeight : "bold",
        fontSize : 18
    }
})

export default Bar;