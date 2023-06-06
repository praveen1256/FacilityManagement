import { StyleSheet, Text, View } from "react-native"
import { Button, TextInput } from "react-native-paper";
import FM_Header from "../components/FM_Header";
import Header from "../components/Header";

const Login = () => {
    return (
        <View style={styles.loginContainer}>
            <Header />
            <FM_Header />
            <View style={styles.form}>
                <View style={styles.idInputLabel}>
                    <TextInput
                        mode="outlined"
                        style={styles.inputContainerStyle}
                        placeholder="ID"
                    />
                </View>
                <View style={styles.passwordInputLabel}>
                    <TextInput
                        mode="outlined"
                        style={styles.inputContainerStyle}
                        placeholder="Password"
                    />
                </View>
                <View style={styles.buttonStyle}>
                    <Button 
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                        mode="outlined" onPress={() => console.log("Pressed")}>
                        Login In
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        width:'100%',
        height: '100%',
        backgroundColor: '#222D32'
    },
    form: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#FFFFFF'
    },
    idInputLabel: {
        marginTop: 36
    },
    passwordInputLabel: {
        marginTop: 24
    },
    buttonStyle: {
        marginTop: 36
    },
    fontColorSet: {
        fontSize: 12,
        color: '#FFFFFF'
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
    }
});

export default Login;