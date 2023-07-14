import React, { useState } from 'react';
import { View, TextInput, Button, Platform, StyleSheet, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { login } from "../api";

const LoginScreen = () => {
    const [cedula, setCedula] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const user = await login(cedula, contrasenia);
            if (user) {
                // Lógica cuando la autenticación es exitosa
                console.log('Usuario autenticado:', user);
                navigation.navigate("Tabs");
            } else {
                // Lógica cuando las credenciales son inválidas
                setError('Credenciales inválidas');
            }
        } catch (error) {
            // Lógica cuando ocurre un error en la autenticación
            console.log('Error al autenticar al usuario:', error);
            setError('Ocurrió un error al iniciar sesión');
        }
    };

    const renderCedulaWarning = () => {
        if (cedula.length < 10) {
            return (
                <Text>
                    La cedula tiene que tener 10 digitos.
                </Text>
            );
        }
        return null;
    };

    const renderContraseniaWarning = () => {
        if (contrasenia.length < 4) {
            return (
                <Text>
                    Ingrese una contraseña valida, minimo 4 caracteres
                </Text>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>INICIO SECION USUARIO FISEI</Text>
            <TextInput
                style={styles.input}
                placeholder="Cédula"
                value={cedula}
                onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, "");
                    setCedula(numericValue);
                }}
                maxLength={10}
                keyboardType="numeric" // Permitir solo entrada numérica
            />
            {renderCedulaWarning()}
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={contrasenia}
                onChangeText={setContrasenia}
                maxLength={25}
            />
            {renderContraseniaWarning()}
            <Text></Text>
            <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
