import React from "react";
import { Text, StyleSheet } from "react-native";

import LayoutEquipos from "../componentsWeb/Layout";
import EquiposList from "../componentsWeb/EquiposList";

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