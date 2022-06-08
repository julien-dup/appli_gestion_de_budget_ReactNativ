import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Picker } from "@react-native-picker/picker"
import data from '../../assets/data/data'
import GlobalContext from '../tools/GlobalContext'
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'


const AccountScreen = (props) => {

  const contextValue = useContext(GlobalContext)

  console.log(contextValue.user)
  console.log(contextValue.index)

  const [country, setCountry] = useState(contextValue.user);
  const [dataClient, setDataClient] = useState(data[contextValue.index])


  useFocusEffect(() => {
    setCountry(contextValue.user)
    setDataClient(data[contextValue.index])
  })


  return (
    <View>

        <View>
            <Text style={styles.text}>KindaCode.com</Text>
            <Picker
            selectedValue={country}
            onValueChange={(text, index) => {
              contextValue.user = text
              contextValue.index = index
              setCountry(text)
              setDataClient(data[index])
            }}
            mode="dropdown"
            >
            {data.map((item, index) => <Picker.Item label={item.user} value={item.user} key={index} /> )}
            
            </Picker>
        </View>
      <TouchableOpacity onPress={() => props.navigation.navigate('Income')}>
        <Text>Income</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Expense')}>
      <Text>Expense</Text>
    </TouchableOpacity>

    {dataClient.expenses.map((item, index) => <Text key={index}>{item.amount}</Text> )}

    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})