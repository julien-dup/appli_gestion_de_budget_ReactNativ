import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StackNavigation from '../navigation/StackNavigation';
import StatScreen from '../screens/StatScreen';
import Icon from 'react-native-vector-icons/Entypo'


const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={ { headerShown : false , tabBarActiveTintColor: 'red', tabBarInactiveTintColor: 'blue'}} >
        <Screen name="Home" component={HomeScreen}  options={{tabBarIcon: () => (<Icon name='home'  size={32} />)}}/>
        <Screen name="Account" component={StackNavigation} />
        <Screen name="Stat" component={StatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomNavigation

const styles = StyleSheet.create({
  btmNavigator: {
    backgroundColor: '#393d3f'
  }
})