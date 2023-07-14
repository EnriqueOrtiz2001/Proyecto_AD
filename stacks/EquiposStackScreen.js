import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EquiposScreen from '../screens/EquiposScreen';

const EquiposStackScreen = () => {
    const EquiposStackScreen = createNativeStackNavigator();
    return (
        <EquiposStackScreen.Navigator>
            <EquiposStackScreen.Screen name='Equipos' component={EquiposScreen}/>
        </EquiposStackScreen.Navigator>
  )
}

export default EquiposStackScreen