import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

import { locationzedStrings } from "../localization/Localizaton";

const FM_Header = ({}) => {
    useEffect(() => {
        startAnimationFromRight();
        startAnimationFromLeft();
    }, []);

    const rightPosition = useRef(new Animated.Value(600)).current;
    const leftPosition = useRef(new Animated.Value(-300)).current;

    // Left & Right Animations
    const startAnimationFromRight = () => {
        Animated.timing(rightPosition, {
            toValue: 0, // Target position on the X-axis (left side)
            duration: 1000, // Duration of the animation in milliseconds
            useNativeDriver: true, // Enable native driver for better performance
        }).start();
    };
    const startAnimationFromLeft = () => {
        Animated.timing(leftPosition, {
            toValue: 0, // Target position on the X-axis (left side)
            duration: 1000, // Duration of the animation in milliseconds
            useNativeDriver: true, // Enable native driver for better performance
        }).start();
    };

    return (
        <View style={styles.headerBackground}>
            <Text style={styles.facilityColor}>{locationzedStrings.header.headerFacility}</Text>
            <Text style={styles.textWhite}>{locationzedStrings.header.headerManagement}</Text>
            <Animated.View style={[{ transform: [{ translateX: leftPosition }] }]}>
                <View style={styles.everyWhereBg}>
                    <Animated.View style={[{ transform: [{ translateX: rightPosition }] }]}>
                        <Text style={styles.everyWhereText}>{locationzedStrings.header.headerEveryWhere}</Text>
                    </Animated.View>
                </View>
            </Animated.View>
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
        paddingEnd: 10,
        backgroundColor: "#D52818",
        width: 180,
        borderRadius: 10,
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
