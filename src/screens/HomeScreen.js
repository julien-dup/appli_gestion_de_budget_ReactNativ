import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import GlobalContext from '../tools/GlobalContext'
import data from '../../assets/data/data'
import { Picker } from "@react-native-picker/picker"
import Icon from 'react-native-vector-icons/Entypo'
import { useFocusEffect } from '@react-navigation/native'
import Card from '../components/Card'




const HomeScreen = (props) => {

  const contextValue = useContext(GlobalContext)

  const [country, setCountry] = useState(contextValue.user);
  const [dataClient, setDataClient] = useState(data[contextValue.index])

  console.log(dataClient)

  const [ShowExpenses, setShowExpenses] = useState(true)

  const expenses = dataClient.expenses.slice().map(item => {
    return { ...item, date: new Date(item.date).getTime()}
    }).slice().sort((a, b) => b.date - a.date)
 
   const incomes = dataClient.incomes.slice().map(item => {
     return { ...item, date: new Date(item.date).getTime()}
     }).slice().sort((a, b) => b.date - a.date);

     console.log(incomes)

  useFocusEffect(() => {
    setCountry(contextValue.user)
    setDataClient(data[contextValue.index])
  })

  console.log(contextValue)

  const totalExpensesCalcul = dataClient.expenses.map(item => item.amount.replace('€', '').replace(',', '')).reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)
  const totalIncomsesCalcul = dataClient.incomes.map(item => item.amount.replace('€', '').replace(',', '')).reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)
  const solde = parseInt(totalIncomsesCalcul) - parseInt(totalExpensesCalcul)

  return (

    

    <View style={{flex: 1, backgroundColor: '#393d3f', marginTop: 0}}>
    

      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

      <View>
            <Picker
            style={styles.picker}
            selectedValue={country}
            onValueChange={(text, index) => {
              contextValue.user = text
              contextValue.index = index - 1
              setCountry(text)
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

      <View style={{flex : 0.5, flexDirection: 'row', justifyContent: 'space-around', marginTop: 0}}>
            <TouchableOpacity
            onPress={()=> setShowExpenses(true)}>
                <Text style={{color: '#fdfdff', textDecorationLine: 'underline', fontSize: 24}}>Dépense</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setShowExpenses(false)}>
                <Text style={{color: '#fdfdff', textDecorationLine: 'underline', fontSize: 24}}>Revenue</Text>
            </TouchableOpacity>
        </View>

        
        <FlatList style={{backgroundColor: '#546a7b', 
        flex: 6, 
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        marginTop: 0,
         borderWidth: 2, 
         borderColor: '#fdfdff', 
         borderRadius: 10,
         shadowColor: '#c6ac8f',
         shadowOffset: { width: 5
            , height: -1 },
         shadowOpacity: 0.8,
         shadowRadius: 2,}}
            data = {ShowExpenses? expenses: incomes}
            
            renderItem = {({item, index})=>  
                   <Card key={index} date={item.date} category={item.category} amount={item.amount} />    
                // console.log(item)
            }
            >  
        </FlatList>
        

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: '#fdfdff',
        fontSize: 16
    },
    flatlist : {
        backgroundColor: '#546a7b', 
        flex: 5, 
        margin: 16,
         borderWidth: 2, 
         borderColor: '#fdfdff', 
         borderRadius: 10,
         shadowColor: '#fdfdff',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.8,
         shadowRadius: 2,
    },
    picker: {
      backgroundColor: '#546a7b',
      color: '#fdfdff',
      fontSize: 16
    }
})
