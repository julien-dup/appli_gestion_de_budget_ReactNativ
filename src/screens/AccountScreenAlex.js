import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Picker } from "@react-native-picker/picker"
import Icon from 'react-native-vector-icons/FontAwesome'
import GlobalContext from '../tools/GlobalContext'
import Card from '../components/Card'
import data from '../../assets/data/data'


const AccountScreenAlex = ({navigation}) => {


  const contextValue = useContext(GlobalContext)
  const { incomes, expenses } = data[contextValue.index]

  const [user, setUser] = useState(contextValue.user);
  const [showTransactions, setShowTransactions] = useState([])
  const [activeShow, setActiveShow] = useState('allTransactions')


  incomes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const allTransaction = [...expenses, ...incomes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())


  const totalExpenses = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount.replace('€', '').replace(',', '')), 0).toFixed(2)
  const totalIncomes = incomes.reduce((acc, curr) => acc + parseFloat(curr.amount.replace('€', '').replace(',', '')), 0).toFixed(2)
  const bankBalance = (parseFloat(totalIncomes) - parseFloat(totalExpenses)).toFixed(2)


  useFocusEffect(() => {
    setUser(contextValue.user)
  })


  useEffect(() => {

    setShowTransactions(allTransaction)
    setActiveShow('allTransactions')

  }, [user])


  return (

    <SafeAreaProvider>

      <View style={styles.container}>

        <View style={{ flex : 1 }}>

          <Picker
            style={styles.picker}
            selectedValue={user}
            mode="dropdown"
            onValueChange={(text, index) => {
              contextValue.user = text
              contextValue.index = index
              setUser(text)
            }}
          >
            {data.map((item, index) =>
              <Picker.Item style={{ fontSize : 13}} label={item.user} value={item.user} key={index} />
            )}
          </Picker>

        </View>

        <View style={{ flex : 1.5, flexDirection : 'row', justifyContent : 'center', alignItems  : 'center' }}>

          <View style={{ flex : 1 }}>

            <View style={{backgroundColor : '#546a7b', padding : 5, marginEnd : 5, borderTopLeftRadius : 7, borderTopRightRadius : 7 }}>
              <Text style={{ color : '#fdfdff', textAlign : 'center'}}>Total Revenus</Text>
            </View>
            <View style={{ backgroundColor : '#2A2D2E', padding : 5, marginEnd : 5, borderBottomLeftRadius : 7, borderBottomRightRadius : 7  }}>
              <Text style={{ color: '#fdfdff', textAlign : 'center'}}>{totalIncomes} €</Text>
            </View>

          </View>

          <View style={{ flex : 1 }}>

            <View style={{backgroundColor : '#546a7b', padding : 5, marginStart : 5, borderTopLeftRadius : 7, borderTopRightRadius : 7 }}>
              <Text style={{ color : '#fdfdff', textAlign : 'center'}}>Total Dépenses</Text>
            </View>

            <View style={{ backgroundColor : '#2A2D2E', padding : 5, marginStart : 5, borderBottomLeftRadius : 7, borderBottomRightRadius : 7  }}>
              <Text style={{ color: '#fdfdff', textAlign : 'center'}}>{totalExpenses} €</Text>
            </View>

          </View>

        </View>

        <View style={{ flex : 1.6, justifyContent : 'center', alignItems : 'center' }}>

          <View style={{ backgroundColor : '#2A2D2E', paddingHorizontal : 20, paddingVertical : 10, borderRadius : 7 }}>
          <Text style={{ fontWeight : 'bold', fontSize : 20, color :  '#fdfdff', textAlign : 'center'}}>SOLDE</Text>
          <Text style={ Math.sign(bankBalance) === 1 ? { fontWeight : 'bold', fontSize : 20, color :  '#62929e', textAlign : 'center'} : { fontWeight : 'bold', fontSize : 20, color :  '#851624', textAlign : 'center'}}>{bankBalance} €</Text>
          </View>
        </View>


        <View style={styles.containerMenu}>

          <View style={{ flex : 1 }}>
              <TouchableOpacity
              onPress={() => {
                setShowTransactions(allTransaction)
                setActiveShow('allTransactions')
              }}
              style={activeShow === 'allTransactions' ? styles.showActive : styles.showInactive}>
                <Text style={activeShow === 'allTransactions' ? styles.showActiveText  : styles.showInactiveText }>Tous</Text>
              </TouchableOpacity>
          </View>

          <View style={{ flex : 1 }}>
              <TouchableOpacity onPress={() => {
                setShowTransactions(incomes)
                setActiveShow('incomes')
              }}
              style={activeShow === 'incomes' ? styles.showActive : styles.showInactive}>
                <Text style={activeShow === 'incomes' ? styles.showActiveText  : styles.showInactiveText }>Revenus</Text>
              </TouchableOpacity>
          </View>

          <View style={{ flex : 1 }}>
              <TouchableOpacity onPress={() => {
                setShowTransactions(expenses)
                setActiveShow('expenses')
              }}
              style={activeShow === 'expenses' ? styles.showActive : styles.showInactive}>
                <Text style={activeShow === 'expenses' ? styles.showActiveText  : styles.showInactiveText }>Dépenses</Text>
              </TouchableOpacity>
          </View>

        </View>



        <View style={styles.containerFlatlist}>
          <FlatList
            data={showTransactions}
            renderItem={Card}
            keyExtractor={(item, index) => index}
            ListFooterComponentStyle = {{ borderBottomLeftRadius : 8, borderBottomRightRadius : 8}}
          />
        </View>




        <View style={styles.containerButtons}>

          <View style={{ flex : 1 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Income')}
                style={styles.buttonLeft}
              >
                  <Text style={styles.textButton}><Icon name='plus' />   REVENUS</Text>
              </TouchableOpacity>
          </View>

          <View style={{ flex : 1 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Expense')}
                style={styles.buttonRight}
              >
                <Text style={styles.textButton}><Icon name='plus' />   DEPENSES</Text>
              </TouchableOpacity>
          </View>

        </View>

      </View>

    </SafeAreaProvider>
  )
}

export default AccountScreenAlex

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#393d3f',
    padding : 14,
    color : '#fdfdff'
  },
  picker : {
    height : 30,
    width : '100%',
    backgroundColor : '#546a7b',
    color : '#fdfdff',
    padding : 0
  },
  containerMenu : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'flex-end',
    marginTop : 20,
    alignItems : 'flex-end'
  },
  containerFlatlist : {
    flex : 4.5,
    backgroundColor: 'white',
    borderBottomLeftRadius : 8,
    borderBottomRightRadius : 8
  },
  containerButtons : {
    flex : 1.5,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  },
  showActive : {
    padding : 10,
    marginVertical : 10,
    backgroundColor : '#62929e',
    borderTopLeftRadius : 8,
    borderTopRightRadius : 8,
    marginBottom : 0
  },
  showInactive : {
    padding : 10,
    marginVertical : 10,
    backgroundColor : '#393d3f',
    marginBottom : 0
  },
  showActiveText : {
    color : '#FDFDFF',
    textAlign : 'center',
    fontWeight : 'bold'
  },
  showInactiveText : {
    color : '#62929e',
    textAlign : 'center',
    fontWeight : 'bold'
  },
  buttonLeft : {
    padding : 10,
    marginVertical : 10,
    marginEnd : 5,
    backgroundColor : '#62929e',
    padding : 15,
    borderRadius : 7,
  },
  buttonRight : {
    padding : 10,
    marginVertical : 10,
    marginStart : 5,
    backgroundColor : '#62929e',
    padding : 15,
    borderRadius : 7,
  },
  textButton : {
    color : '#FDFDff',
    textAlign : 'center'
  }
})