import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PersonaFormScreen from './screens/PersonaFormScreen';
import PersonaScreen from './screens/PersonaScreen';
import EquiposScreen from './screens/EquiposScreen';
import EquiposFormScreen from './screens/EquiposFormScreen';
import SolicitudesScreen from './screens/SolicitudesScreen';
import SolicitudesFormScreen from './screens/SolicitudesFormSreen';
import CustodiaScreen from './screens/CustodiaScreen';
import DevolucionesScreen from './screens/DevolucionesScreen';
import DevolucionesFormScreen from './screens/DevolucionesFormScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="PersonaMenu"
                options={{ title: 'Personas' }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="PersonaScreen"
                            component={PersonaScreen}
                            options={({ navigation }) => ({
                                title: 'Listado de Personas',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('PersonaFormScreen')}>
                                        <Text style={{ color: '#fff', marginRight: 20, fontSize: 17 }}>Nueva Persona</Text>
                                    </TouchableOpacity>
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="PersonaFormScreen"
                            component={PersonaFormScreen}
                            options={{
                                title: 'Crear Nueva Persona',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                                headerTintColor: '#fff',
                            }}
                        />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen
                name="EquiposMenu"
                options={{ title: 'Equipos' }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="EquiposScreen"
                            component={EquiposScreen}
                            options={({ navigation }) => ({
                                title: 'Listado de Equipos',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('EquiposFormScreen')}>
                                        <Text style={{ color: '#fff', marginRight: 20, fontSize: 17 }}>Nuevo Equipo</Text>
                                    </TouchableOpacity>
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="EquiposFormScreen"
                            component={EquiposFormScreen}
                            options={{
                                title: 'Crear Nuevo Equipo',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                                headerTintColor: '#fff',
                            }}
                        />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="SolicitudesMenu"
                options={{ title: 'Solicitudes' }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="SolicitudesScreen"
                            component={SolicitudesScreen}
                            options={({ navigation }) => ({
                                title: 'Listado Solicitudes',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('SolicitudesFormScreen')}>
                                        <Text style={{ color: '#fff', marginRight: 20, fontSize: 17 }}>Nueva Solicitud</Text>
                                    </TouchableOpacity>
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="SolicitudesFormScreen"
                            component={SolicitudesFormScreen}
                            options={{
                                title: 'Crear Nueva Solicitud',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                                headerTintColor: '#fff',
                            }}
                        />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="CustodiaMenu"
                options={{ title: 'Custodias' }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="CustodiaScreen"
                            component={CustodiaScreen}
                            options={{
                                title: 'Listado de Custodia',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                            }}
                        />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="DevolucionesMenu"
                options={{ title: 'Devoluciones' }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="DevolucionesScreen"
                            component={DevolucionesScreen}
                            options={{
                                title: 'Listado de Devoluciones',
                                headerStyle: { backgroundColor: '#AF8A46' },
                                headerTitleStyle: { color: '#fff' },
                            }}
                        />
                        <Stack.Screen
                            name="DevolucionesFormScreen"
                            component={DevolucionesFormScreen}
                        />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default Tabs;
