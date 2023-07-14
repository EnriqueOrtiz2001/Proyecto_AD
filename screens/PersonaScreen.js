import React from "react";
import { Text, StyleSheet } from "react-native";

import Layout from "../components/Layout";
import PersonaList from "../components/TaskList";

const PersonaScreen = () => (
    <Layout>
        <PersonaList />
    </Layout>
);

const styles = StyleSheet.create({

    titleHeader: {
        color: '#000000',
        fontSize: 20
    }

})

export default PersonaScreen;