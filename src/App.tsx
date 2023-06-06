import React, { ReactElement } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";

import { LightTheme } from "./theme";
import Navigator, { RootStackParamList } from "./Navigator";

function App(): ReactElement {
    const intializeApp = async (navigationContainerRef: NavigationContainerRef<RootStackParamList>) => {
        // eslint-disable-next-line no-console
        console.log(navigationContainerRef);
    };

    return (
        <PaperProvider theme={LightTheme}>
            <NavigationContainer<RootStackParamList>
                ref={(container) => {
                    if (container)
                        // run the following function after main thread is free
                        setImmediate(() => intializeApp(container));
                }}
            >
                <Navigator />
            </NavigationContainer>
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
