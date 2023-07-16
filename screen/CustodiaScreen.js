import React from "react";
import { Text, StyleSheet } from "react-native";

import LayoutCustodia from "../componentsWeb/Layout";
import CustodiaList from "../componentsWeb/CustodiaList";

const CustodiaScreen = () => (
        <LayoutCustodia>
            <CustodiaList/>
        </LayoutCustodia>
);

const styles = StyleSheet.create({

    titleHeader: {
        color: '#000000',
        fontSize: 20
    }

})

export default CustodiaScreen;