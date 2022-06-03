import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState  } from 'react'
import GlobalContext from '../tools/GlobalContext'
import { Picker } from "@react-native-picker/picker"
import Icon from 'react-native-ionicons'
import Data from '../../assets/data/data.json'


  // UTILISATION DU CONTEXT (EXEMPLE EN LECTURE PUIS ECRITURE)
  //const contextValue = useContext(GlobalContext)
  //console.log(contextValue.user)
  //contextValue.user = "Changement de nom ..."
  //console.log(contextValue.user)
 


const HomeScreen = () => {

  const [User, setUser] = useState('Unknown');
  const contextValue = useContext(GlobalContext)  

  console.log(contextValue)
  console.log(Data.user)
  
  return (

    

    <View style={{flex: 1, backgroundColor: '#2f3e46'}}>
    

      <View style={{flex: 1, flexDirection: 'row'}}>

        <View style={{flex: 1}}>
            <Text style={styles.text}>Select User</Text>
            <Picker
            selectedValue={User}
            onValueChange={(value, index) => setUser(value)}
            mode="dropdown" // Android only
            >
            <Picker.Item label="Please select your user" value="Unknown" />
            <Picker.Item label="Australia" value="Australia" />
            <Picker.Item label="Belgium" value="Belgium" />
            <Picker.Item label="Canada" value="Canada" />
            <Picker.Item label="India" value="India" />
            <Picker.Item label="Japan" value="Japan" />
            </Picker>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="ion-cash" />
              <Text style={{color: 'white'}}>TOTAL</Text> 
            </View>
            <Text style={{color: 'white'}}>TEST €</Text>
        </View>

      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})