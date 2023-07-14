import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import Tabs from './Tabs';
import TabsPersona from './TabsPersona';

const Stack = createStackNavigator();

const AppNavigator = () => {

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="TabsPersona" component={TabsPersona} />
    </Stack.Navigator>
  </NavigationContainer>
};

export default AppNavigator;
