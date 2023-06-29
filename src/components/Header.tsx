import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { locationzedStrings } from "../localization/Localizaton";

interface MyComponentProps {
    loginPage: boolean;
    loggedInUserName: string;
}

const Header: React.FunctionComponent<MyComponentProps> = () => {
    return (
        <View style={styles.flexColumn}>
            <View style={styles.flexRowDirection}>
                <View style={styles.view2}>
                    <Text style={styles.textCenter}>{locationzedStrings.header.headerVerizon}</Text>
                    <FontAwesome5 style={styles.checkIcon} name="check" size={20} />
                </View>
            </View>
            <View style={styles.greyLine} />
        </View>
    );
};

const styles = StyleSheet.create({
    greyLine: {
        borderWidth: 0.5,
        borderColor: "grey",
        width: "100%",
    },
    flexRow: {
        flexDirection: "row",
        padding: 15,
    },
    flexColumn: {
        flexDirection: "column",
        marginBottom: 15,
    },
    checkIcon: {
        alignSelf: "center",
        marginHorizontal: 5,
        marginBottom: 10,
        color: "#D52818",
    },
    popUpIcon: {
        alignSelf: "center",
        marginHorizontal: 5,
        color: "#D52818",
    },
    ellipsisIcon: {
        color: "#D52818",
        marginEnd: 15,
    },
    flexRowDirection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textCenter: {
        color: "#FFFFFF",
        fontSize: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    loggedInUserName: {
        color: "#FFFFFF",
        fontSize: 15,
        alignSelf: "flex-start",
        marginStart: 15,
    },
    view1: {
        paddingVertical: 15,
        flex: 1,
    },
    view2: {
        flex: 1,
        paddingVertical: 15,
        flexDirection: "row",
    },
    view3: {
        flex: 1,
        paddingVertical: 15,
        alignItems: "flex-end",
    },
    popup: {
        borderRadius: 8,
        borderColor: "#333",
        borderWidth: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        position: "absolute",
        top: 50,
        right: 15,
    },
});

export default Header;
