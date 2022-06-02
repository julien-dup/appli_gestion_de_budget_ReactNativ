import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StackNavigation from '../navigation/StackNavigation';
import StatScreen from '../screens/StatScreen';


const { Navigator, Screen } = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Home' screenOptions={ { headerShown : false }}>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Account" component={StackNavigation} />
        <Screen name="Stat" component={StatScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export default BottomNavigation