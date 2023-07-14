import React, { useRef, useState } from "react";
import { StyleSheet, TextInput as RNTextInput, View, Image, Platform, ImageBackground } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FM_Header from "../../components/FM_Header";
import { AppThunkDispatch, Authentication, RootState } from "../../store";
import { locationzedStrings } from "../../localization/Localizaton";
interface LoginScreenProps {
    isLoading?: boolean;
    error: string | null;
    username: string | null;
    onPressLogin: (username: string, password: string) => void;
}

const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Username must contain atleast 3 character(s)")
        .max(20, "Username must not be longer than 20 character(s)"),
    password: z
        .string()
        .min(3, "Password must contain atleast 3 character(s)")
        .max(20, "Password must not be longer than 20 character(s)"),
});

const LoginScreenView: React.FunctionComponent<LoginScreenProps> = ({ error, onPressLogin, isLoading }) => {
    const { handleSubmit, control } = useForm<z.infer<typeof loginSchema>>({
        defaultValues: {
            password: "password",
            username: "1446144475",
        },
        resolver: zodResolver(loginSchema),
    });

    const secondInputRef = useRef<RNTextInput | null>(null);

    return (
        <View style={styles.loginContainer}>
            {/* <Text style={styles.textCenter}>{username}</Text> */}
            <View style={styles.heading}>
                <View style={styles.flexRow}>
                    {/* <Text style={styles.textCenter}>{locationzedStrings.header.headerVerizon}</Text>
                    <FontAwesome5 style={styles.checkIcon} name="check" size={20} /> */}
                    <Image
                        source={require("../../assets/images/verizon_logo.png")} // Replace with your image path
                        style={styles.image}
                        resizeMode="contain" // Adjust the resizeMode as per your requirement
                    />
                </View>
            </View>
            <View style={styles.greyLine} />
            <FM_Header />
            <ImageBackground
                style={styles.form}
                resizeMode="contain"
                source={require("../../assets/images/login_background.png")}
            >
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, onBlur, value }, fieldState }) => (
                        <>
                            <TextInput
                                mode="outlined"
                                theme={{ roundness: 15 }}
                                style={styles.inputContainerStyle}
                                placeholder={locationzedStrings.login.placeHolderId}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!fieldState.error}
                                disabled={isLoading}
                                returnKeyType="next"
                                onSubmitEditing={() => secondInputRef.current?.focus()}
                            />
                            <HelperText type="error" visible={!!fieldState.error}>
                                {fieldState.error?.message}
                            </HelperText>
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value }, fieldState }) => {
                        const [secureTextEntry, setSecureTextEntry] = useState(true);
                        return (
                            <>
                                <TextInput
                                    mode="outlined"
                                    style={styles.inputContainerStyle}
                                    placeholder={locationzedStrings.login.placeHolderPassword}
                                    onBlur={onBlur}
                                    theme={{ roundness: 15 }}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!fieldState.error}
                                    disabled={isLoading}
                                    secureTextEntry={secureTextEntry}
                                    right={
                                        <TextInput.Icon
                                            icon={secureTextEntry ? "eye" : "eye-off"}
                                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                                        />
                                    }
                                    onSubmitEditing={handleSubmit((data) => onPressLogin(data.username, data.password))}
                                    ref={(input: RNTextInput) => (secondInputRef.current = input)}
                                    returnKeyType="go"
                                />
                                <HelperText type="error" visible={!!fieldState.error}>
                                    {fieldState.error?.message}
                                </HelperText>
                            </>
                        );
                    }}
                />
                <HelperText
                    type="error"
                    visible={!!error}
                    style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "red" }}
                >
                    {error}
                </HelperText>
                <Button
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    mode="outlined"
                    // eslint-disable-next-line no-console
                    onPress={handleSubmit((data) => onPressLogin(data.username, data.password))}
                    disabled={isLoading}
                    icon="login"
                    loading={isLoading}
                >
                    {locationzedStrings.login.button}
                </Button>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#222D32",
        marginTop: Platform.OS === "ios" ? 20 : 0,
    },
    image: {
        width: 200,
        height: 200,
    },
    form: {
        flex: 1,
        marginTop: 0,
        backgroundColor: "#FFFFFF",
        padding: 16,
    },
    fontColorSet: {
        fontSize: 12,
        color: "#FFFFFF",
    },
    inputContainerStyle: {
        margin: 8,
        backgroundColor: "#E0E0E0",
    },
    button: {
        marginTop: 36,
        margin: 4,
        padding: 6,
        width: 200,
        alignSelf: "center",
        backgroundColor: "#D52818",
    },
    buttonLabel: {
        fontSize: 16,
        padding: 4,
        color: "#FFFFFF",
    },
    textCenter: {
        color: "#FFFFFF",
        fontSize: 25,
    },
    checkIcon: {
        alignSelf: "center",
        marginHorizontal: 5,
        marginBottom: 10,
        color: "#D52818",
    },
    heading: {
        height: "7%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    greyLine: {
        borderWidth: 0.5,
        borderColor: "grey",
        width: "100%",
        marginBottom: 5,
    },
    flexRow: {
        flexDirection: "row",
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: false,
};

const mapDispatch = (dispatch: AppThunkDispatch<Authentication.ActionInterfaces>) => ({
    onPressLogin: (username: string, password: string) => dispatch(Authentication.Actions.login(username, password)),
});

const mapState = (state: RootState) => ({
    isLoading: state.auth.loading,
    error: state.auth.error,
    username: state.auth.username,
});

const connector = connect(mapState, mapDispatch);

export const LoginScreen = connector(LoginScreenView);
export const LoginScreenHeaderOptions = HeaderOptions;
export const LoginScreenName = "LoginScreen";
