import { StyleSheet, Text, View, FlatList, TouchableOpacity , Dimensions} from 'react-native'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import GlobalContext from '../tools/GlobalContext'
import data from '../../assets/data/data'
import userSolde from '../components/UserSolde'
import { useFocusEffect } from '@react-navigation/native'
import { Picker } from "@react-native-picker/picker"
import Icon from 'react-native-vector-icons/Entypo'

import {LineChart,BarChart,PieChart, ProgressChart, ContributionGraph,StackedBarChart } from "react-native-chart-kit";

  
const StatScreen = () => {
  
  const contextValue = useContext(GlobalContext)

  const [User, setUser] = useState(contextValue.user);
  const [dataClient, setDataClient] = useState(data[contextValue.index])

  console.log(dataClient)

  const expenses = dataClient.expenses.slice().map(item => {
    return { ...item, date: new Date(item.date).getTime()}
    }).slice().sort((a, b) => b.date - a.date)
 
   const incomes = dataClient.incomes.slice().map(item => {
     return { ...item, date: new Date(item.date).getTime()}
     }).slice().sort((a, b) => b.date - a.date);

  useFocusEffect(() => {
    setUser(contextValue.user)
    setDataClient(data[contextValue.index])
  })

  console.log(expenses)
  const arrayAmountExpense = []
  const arrayDateExpense = []

  expenses.forEach(e => {
    let dateObject = new Date(e.date)
    arrayAmountExpense.push(parseFloat(e.amount.replace('€', '').replace(',', '').replace('.',',')))
    arrayDateExpense.push(dateObject.getDate() + '/' + dateObject.getMonth()  + '/' + dateObject.getFullYear()+ ' ')
  });

  const arrayAmountIncomes = []
  const arrayDateIncomes = []

  incomes.forEach(e => {
    let dateObject = new Date(e.date)
    arrayAmountIncomes.push(parseFloat(e.amount.replace('€', '').replace(',', '').replace('.',',')))
    arrayDateIncomes.push(dateObject.getDate() + '/' + dateObject.getMonth()  + '/' + dateObject.getFullYear()+ ' ')
  });


  const totalExpensesCalcul = dataClient.expenses.map(item => item.amount.replace('€', '').replace(',', '')).reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)
  const totalIncomsesCalcul = dataClient.incomes.map(item => item.amount.replace('€', '').replace(',', '')).reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)
  const solde = parseInt(totalIncomsesCalcul) - parseInt(totalExpensesCalcul)

  return (
    <View style={{flex: 1, backgroundColor: '#393d3f', marginTop: 35}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 16}}>

          <View>
                <Picker
                style={styles.picker}
                selectedValue={User}
                onValueChange={(text, index) => {
                  contextValue.user = text
                  contextValue.index = index - 1
                  setUser(text)
                  setDataClient(data[index - 1])

                  console.log(index - 1)
                }}
                mode="dropdown"
                >
                <Picker.Item label="Please select your country" value="Unknown" />
                {data.map((item, index) => <Picker.Item label={item.user} value={item.user} key={index} /> )}
                
                </Picker>
            </View>


            <View >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="wallet"  size={32} style={{color: 'white'}}/>
                  <Text style={styles.text}>Solde</Text> 
                </View>
                <Text style={{color: 'white', fontSize: 24}}>{solde} €</Text>
            </View>

        </View>

        <View style={{flex: 5, backgroundColor: '#546a7b', padding: 8}}>
            <Text style={styles.text}>Vues des dépenses</Text>
            <LineChart
            
              data={{
                labels: arrayDateExpense,
                datasets: [
                  {
                    data: arrayAmountExpense                   
                  }
                ]
              }}
              
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel="€"
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#c6ac8f",
                backgroundGradientTo: "#2d434e",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
        </View>

        <View style={{flex: 5, backgroundColor: '#546a7b', padding: 8}}>
            <Text style={styles.text}>Vues des revenue</Text>
            <LineChart
            
              data={{
                labels: arrayDateIncomes,
                datasets: [
                  {
                    data: arrayAmountIncomes                   
                  }
                ]
              }}
              
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel="€"
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#c6ac8f",
                backgroundGradientFrom: "#c6ac8f",
                backgroundGradientTo: "#2d434e",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
        </View>

    </View>
  )
}

export default StatScreen

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  picker: {
    backgroundColor: '#546a7b',
    color: '#fdfdff',
    fontSize: 16
  }
})

