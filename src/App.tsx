import React from "react";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { container } from "tsyringe";

import { LightTheme } from "./theme";
import Navigator, { RootStackParamList } from "./Navigator";
import { RootStore } from "./store";
import { NavigationService } from "./services/Navigation.Service";

type AppProps = {
    store: RootStore;
};

const App: React.FunctionComponent<AppProps> = ({ store }) => {
    const intializeApp = async (navigationContainerRef: NavigationContainerRef<RootStackParamList>) => {
        container.registerInstance(NavigationService, new NavigationService(navigationContainerRef));
    };

    return (
        <Provider store={store}>
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
        </Provider>
    );
};
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
