import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from "@react-native-picker/picker"
import Icon from 'react-native-ionicons'

const HomeScreen = () => {

  const [country, setCountry] = useState('Unknown');

  return (
    <View style={{flex: 1}}>
      <Text>HomeScreen</Text>

      <View style={{flex: 1, flexDirection: 'row'}}>

        <View>
            <Text style={styles.text}>KindaCode.com</Text>
            <Picker
            selectedValue={country}
            onValueChange={(value, index) => setCountry(value)}
            mode="dropdown" // Android only
            >
            <Picker.Item label="Please select your country" value="Unknown" />
            <Picker.Item label="Australia" value="Australia" />
            <Picker.Item label="Belgium" value="Belgium" />
            <Picker.Item label="Canada" value="Canada" />
            <Picker.Item label="India" value="India" />
            <Picker.Item label="Japan" value="Japan" />
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

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})