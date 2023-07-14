import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PersonaScreen from '../screens/PersonaScreen';



const PersonaStackScreen = () => {
    const PersonaStackScreen = createNativeStackNavigator();
    return (

        <PersonaStackScreen.Navigator>
            <PersonaStackScreen.Screen name='Persona' component={ PersonaScreen }/>
        </PersonaStackScreen.Navigator>

  )
}

export default PersonaStackScreen