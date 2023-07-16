import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#AF8A46'/>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#EBBA5F',
        padding: 20,
        flex: 1,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#AF8A46'
    }
})

export default Layout