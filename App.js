import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import TabsPersona from "./TabsPersona";
import Tabs from "./Tabs";
// Importa otras pantallas necesarias

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabsPersona"
          component={TabsPersona}
          options={{ headerShown: false }}
        />
        {/* Agrega más Stack.Screen para otras pantallas */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
