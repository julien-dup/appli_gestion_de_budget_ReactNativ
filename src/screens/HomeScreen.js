import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import GlobalContext from '../tools/GlobalContext'
import data from '../../assets/data/data'
import { Picker } from "@react-native-picker/picker"
import Icon from 'react-native-ionicons'
import { useFocusEffect } from '@react-navigation/native'




const HomeScreen = (props) => {

  const contextValue = useContext(GlobalContext)

  const [country, setCountry] = useState(contextValue.user);
  const [dataClient, setDataClient] = useState(data[contextValue.index])


  useFocusEffect(() => {
    setCountry(contextValue.user)
    setDataClient(data[contextValue.index])
  })

  
  return (
    <View style={{flex: 1}}>
      <Text>HomeScreen</Text>

      <View style={{flex: 1, flexDirection: 'row'}}>

      <View>
            <Text style={styles.text}>KindaCode.com</Text>
            <Picker
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


        <View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="add" />
              <Text>TOTAL</Text> 
            </View>
            <Text>TEST €</Text>
        </View>

      </View>
{dataClient.expenses.map((item, index) => <Text key={index}>{item.amount}</Text> )}

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})