import React from "react";
import {View, Text,} from 'react-native'
import { Picker } from "@react-native-picker/picker"
import Icon from 'react-native-vector-icons/Entypo'

const userSolde = () => {
    return(
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

      <View>
            <Text style={styles.text}>Selectionner un Utilisateur</Text>
            <Picker
            selectedValue={user}
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
    )
}

export default userSolde