import React from "react";
import { Text, StyleSheet } from "react-native";

import LayoutEquipos from "../components/Layout";
import EquiposList from "../components/EquiposList";

const EquiposScreen = () => (
        <LayoutEquipos>
            <EquiposList/>
        </LayoutEquipos>
);

const styles = StyleSheet.create({

    titleHeader: {
        color: '#000000',
        fontSize: 20
    }

})

export default EquiposScreen;