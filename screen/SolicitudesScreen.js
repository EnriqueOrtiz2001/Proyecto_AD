import React from "react";
import { Text, StyleSheet } from "react-native";

import LayoutSolicitudes from "../componentsWeb/Layout";
import SolicitudesList from "../componentsWeb/SolicitudesList";


const SolicitudesScreen = () => (
    <LayoutSolicitudes>
            <SolicitudesList />
    </LayoutSolicitudes>
);

const styles = StyleSheet.create({

    titleHeader: {
        color: '#000000',
        fontSize: 20
    }

})

export default SolicitudesScreen;