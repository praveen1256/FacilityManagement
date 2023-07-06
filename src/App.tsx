import React from "react";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { container } from "tsyringe";
import { enGB, registerTranslation } from "react-native-paper-dates";
import Toast, { ErrorToast, ToastConfig } from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

import { LightTheme } from "./theme";
import Navigator, { RootStackParamList } from "./Navigator";
import { RootStore } from "./store";
import { NavigationService } from "./services/Navigation.Service";

registerTranslation("en-GB", enGB);
const toastConfig: ToastConfig = {
    error: ({ ...rest }) => (
        <ErrorToast
            {...rest}
            contentContainerStyle={{
                paddingLeft: 8,
            }}
            renderLeadingIcon={() => (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 8,
                    }}
                >
                    <Icon name="alert-circle-outline" size={24} color="red" />
                </View>
            )}
        />
    ),
};

type AppProps = {
    store: RootStore;
};

const App: React.FunctionComponent<AppProps> = ({ store }) => {
    const intializeApp = async (navigationContainerRef: NavigationContainerRef<RootStackParamList>) => {
        container.registerInstance(NavigationService, new NavigationService(navigationContainerRef));
        // Invoke initialization states
        // Check if the phone is rooted, if yes donot go forward.
        // Check if all ther permissions available, else show app error screen
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
                <Toast config={toastConfig} />
            </PaperProvider>
        </Provider>
    );
};

export default App;
