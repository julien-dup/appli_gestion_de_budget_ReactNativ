import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import GlobalContext from '../tools/GlobalContext'


const HomeScreen = () => {


  // UTILISATION DU CONTEXT (EXEMPLE EN LECTURE PUIS ECRITURE)
  //const contextValue = useContext(GlobalContext)
  //console.log(contextValue.user)
  //contextValue.user = "Changement de nom ..."
  //console.log(contextValue.user)


  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})