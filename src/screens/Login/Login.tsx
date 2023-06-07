import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import FM_Header from "../../components/FM_Header";
import Header from "../../components/Header";

const LoginScreenView = () => {
    return (
        <View style={styles.loginContainer}>
            <Header />
            <FM_Header />
            <View style={styles.form}>
                <View style={styles.idInputLabel}>
                    <TextInput mode="outlined" style={styles.inputContainerStyle} placeholder="ID" />
                </View>
                <View style={styles.passwordInputLabel}>
                    <TextInput mode="outlined" style={styles.inputContainerStyle} placeholder="Password" />
                </View>
                <View style={styles.buttonStyle}>
                    <Button
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                        mode="outlined"
                        // eslint-disable-next-line no-console
                        onPress={() => console.log("Pressed")}
                    >
                        Login In
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#222D32",
    },
    form: {
        flex: 1,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
    },
    idInputLabel: {
        marginTop: 36,
    },
    passwordInputLabel: {
        marginTop: 24,
    },
    buttonStyle: {
        marginTop: 36,
    },
    fontColorSet: {
        fontSize: 12,
        color: "#FFFFFF",
    },
    inputContainerStyle: {
        margin: 8,
    },
    button: {
        margin: 4,
        padding: 6,
    },
    buttonLabel: {
        fontSize: 16,
        padding: 4,
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: false,
};

// const mapDispatch = (dispatch: AppThunkDispatch<AppState.ActionInterfaces>) => ({
//     onPressContinue: () => console.log("pressContinue!!"),
// });

// const mapState = (state: RootState) => ({
//     isAuthStateInitialized: state.auth.isIntialized,
// });

// const connector = connect(mapState, mapDispatch);

// export const HomeScreen = connector(HomeScreenView);
export const LoginScreenHeaderOptions = HeaderOptions;
export const LoginScreenName = "LoginScreen";
export const LoginScreen = LoginScreenView;
