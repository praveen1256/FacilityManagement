import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from "react-redux";

import { HomeScreen, LoginScreen, WorkTaskScreen, WorkTasksScreen } from "./screens";
import { RootState } from "./store";
import SplashScreen from "./screens/SplashScreen";

export type RootStackParamList = {
    [HomeScreen.HomeScreenName]: undefined;
    [LoginScreen.LoginScreenName]: undefined;
    [WorkTasksScreen.WorkTasksScreenName]: undefined;
    [WorkTaskScreen.WorkTaskScreenName]: {
        workTaskId: string;
    };
    ["SplashScreen"]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface NavigatorProps {
    isAppInitialized?: boolean;
    isAuthenticated?: boolean;
    initializationError?: unknown;
}

const Navigator: React.FunctionComponent<NavigatorProps> = ({ isAuthenticated, isAppInitialized }) => {
    const renderStackScreens = () => {
        if (!isAppInitialized)
            return (
                <>
                    <Stack.Screen name={"SplashScreen"} options={{ headerShown: false }} component={SplashScreen} />
                </>
            );

        // if (initializationError)
        //     return (
        //         <Stack.Screen
        //             name="InitializationError"
        //             options={ErrorScreen.options}
        //             component={() => <ErrorScreen.view error={initializationError} />}
        //         />
        //     );

        //authenticated show login screens
        if (isAuthenticated) {
            return (
                <>
                    <Stack.Screen
                        name={HomeScreen.HomeScreenName}
                        options={HomeScreen.HomeScreenHeaderOptions}
                        component={HomeScreen.HomeScreen}
                    />
                    <Stack.Screen
                        name={WorkTasksScreen.WorkTasksScreenName}
                        options={WorkTasksScreen.WorkTasksScreenHeaderOptions}
                        component={WorkTasksScreen.WorkTasksScreen}
                    />
                    <Stack.Screen
                        name={WorkTaskScreen.WorkTaskScreenName}
                        options={WorkTaskScreen.WorkTaskScreenHeaderOptions}
                        component={WorkTaskScreen.WorkTaskScreen}
                        initialParams={{
                            workTaskId: "1856911114",
                        }}
                    />
                </>
            );
        }

        //Unauthenticated show login screens
        return (
            <>
                <Stack.Screen name={"SplashScreen"} options={{ headerShown: false }} component={SplashScreen} />

                {/* <Stack.Screen name={SplashScreenName} options={SplashScreenHeaderOptions} component={SplashScreen} /> */}
                <Stack.Screen
                    name={LoginScreen.LoginScreenName}
                    options={LoginScreen.LoginScreenHeaderOptions}
                    component={LoginScreen.LoginScreen}
                />
            </>
        );
    };

    return (
        <Stack.Navigator
            screenOptions={
                {
                    // gestureEnabled: true,
                    // gestureDirection: "horizontal",
                    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }
            }
            initialRouteName={LoginScreen.LoginScreenName}
            // initialRouteName={HomeScreen.HomeScreenName}
        >
            {renderStackScreens()}
        </Stack.Navigator>

        // <Stack.Navigator initialRouteName={WorkTaskScreen.WorkTaskScreenName}>{renderStackScreens()}</Stack.Navigator>
    );
};

const mapState = (state: RootState) => ({
    isAppInitialized: state.app.isInitialized,
    isAuthenticated: !!state.auth.isAuthenticated,
    initializationError: state.app.initializationError,
});

const connector = connect(mapState);

export default connector(Navigator);
