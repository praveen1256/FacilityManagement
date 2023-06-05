/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { ReactElement } from "react";
import { SafeAreaView, StatusBar, Text, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { PaperProvider } from "react-native-paper";

import { LightTheme } from "./theme";
import ComponentsTester from "./components/ComponentsTester";

function App(): ReactElement {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <PaperProvider theme={LightTheme}>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <Text>Facility Management.... Hello...</Text>
                <ComponentsTester />
            </SafeAreaView>
        </PaperProvider>
    );
}

// const styles = StyleSheet.create({
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: "600",
//     },
//     sectionDescription: {
//         marginTop: 8,
//         fontSize: 18,
//         fontWeight: "400",
//     },
//     highlight: {
//         fontWeight: "700",
//     },
// });

export default App;
