import React from "react";
import { Text, StyleSheet } from "react-native";

import LayoutDevoluciones from "../componentsWeb/Layout";
import DevolucionesList from "../componentsWeb/DevolucionesList";

const DevolucionesScreen = () => (
        <LayoutDevoluciones>
            <DevolucionesList/>
        </LayoutDevoluciones>
);

const styles = StyleSheet.create({

    titleHeader: {
        color: '#000000',
        fontSize: 20
    }

})

export default DevolucionesScreen;