import React from 'react'
import {View, Text , StyleSheet} from 'react-native'

const Card = (props) => {

    const {index ,date, category, amount} = props
    const dateObject = new Date(date)
    console.log(dateObject)
    const showDate = (dateObject.getDate() + '/' + dateObject.getMonth()  + '/' + dateObject.getFullYear() + '  '+ dateObject.getHours()+'h' + dateObject.getMinutes() )
    console.log(showDate)
    return(
        <View key={index} style={styles.card}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text>{showDate}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text>{category}</Text>
                <Text>{amount}</Text>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#c6ac8f',
        margin: 16,
        padding: 8,
        borderRadius: 10, 
        height: 140
    }
})