import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import IncomeScreen from '../screens/IncomeScreen';
import ExpenseScreen from '../screens/ExpenseScreen';


const { Navigator , Screen } = createNativeStackNavigator();

const App = () => (

      <Navigator initialRouteName='HomeAccount'>
        <Screen name="HomeAccount" component={AccountScreen} />
        <Screen name="Income" component={IncomeScreen} />
        <Screen name="Expense" component={ExpenseScreen} />
      </Navigator>

)

export default App