import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { locationzedStrings } from "../localization/Localizaton";

const Header: React.FunctionComponent = () => {
    return (
        <View style={styles.headerBackground}>
            <View style={styles.flexRow}>
                <Text style={styles.text}>{locationzedStrings.header.headerVerizon}</Text>
                <FontAwesome5 style={styles.checkIcon} name="check" size={20} />
                {/* <FontAwesome5 style={styles.ellipsisIcon} name="ellipsis-v" size={30} /> */}
            </View>
            <View style={styles.greyLine} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerBackground: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        backgroundColor: "#222D32",
    },
    text: {
        color: "#FFFFFF",
        fontSize: 25,
        marginStart: 15,
    },
    greyLine: {
        borderWidth: 0.5,
        borderColor: "grey",
        width: "100%",
        marginTop: 15,
    },
    flexRow: {
        flexDirection: "row",
    },
    checkIcon: {
        alignSelf: "center",
        marginHorizontal: 5,
        marginBottom: 10,
        color: "#D52818",
    },
    ellipsisIcon: {
        color: "#D52818",
        backgroundColor: "#FF00FF",
    },
});

export default Header;
