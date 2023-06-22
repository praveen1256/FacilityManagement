import React from "react";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { container } from "tsyringe";
import { enGB, registerTranslation } from "react-native-paper-dates";
import Toast, { ErrorToast, ToastConfig } from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

import { App as AppState, AppThunkDispatch, Authentication, RootStore } from "./store";
import { LightTheme } from "./theme";
import Navigator, { RootStackParamList } from "./Navigator";
import { NavigationService } from "./services/Navigation.Service";
import { appInitialized } from "./store/App/actions";

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
        if (store.getState().app.initializationStarted) return;
        const dispatch = store.dispatch as AppThunkDispatch;

        dispatch(AppState.Actions.appInitializate());

        container.registerInstance(NavigationService, new NavigationService(navigationContainerRef));
        // Check if user details are stored in local storage
        dispatch(Authentication.Actions.initializeAuthentication());
        // if they are, then dispatch AUTH_LOGIN_ACTION and wait for it to complete
        // if they are not, donot do anything

        dispatch(appInitialized());
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
