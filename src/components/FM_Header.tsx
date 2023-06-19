import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { locationzedStrings } from "../localization/Localizaton";

const FM_Header = ({}) => {
    return (
        <View style={styles.headerBackground}>
            <Text style={styles.facilityColor}>{locationzedStrings.header.headerFacility}</Text>
            <Text style={styles.textWhite}>{locationzedStrings.header.headerManagement}</Text>
            <View style={styles.everyWhereBg}>
                <Text style={styles.everyWhereText}>{locationzedStrings.header.headerEveryWhere}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBackground: {
        alignItems: "flex-start",
        paddingStart: 10,
        backgroundColor: "#222D32",
    },
    facilityColor: {
        color: "#D52818",
        fontSize: 25,
    },
    textWhite: {
        color: "#FFFFFF",
        fontSize: 25,
    },
    everyWhereBg: {
        fontSize: 20,
        marginVertical: 15,
        backgroundColor: "#D52818",
        width: "50%",
    },
    everyWhereText: {
        color: "#FFFFFF",
        fontSize: 18,
        padding: 4,
        alignSelf: "flex-end",
        fontWeight: "bold",
    },
});

export default FM_Header;
