import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen, LoginScreen, WorkTaskScreen, WorkTasksScreen } from "./screens";

export type RootStackParamList = {
    [HomeScreen.HomeScreenName]: undefined;
    [LoginScreen.LoginScreenName]: undefined;
    [WorkTasksScreen.WorkTasksScreenName]: undefined;
    [WorkTaskScreen.WorkTaskScreenName]: {
        workTaskId: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface NavigatorProps {
    isAuthStateInitialized?: boolean;
    isAuthenticated?: boolean;
    initializationError?: unknown;
}

const Navigator: React.FunctionComponent<NavigatorProps> = ({}) => {
    const renderStackScreens = () => {
        // if (initializationError)
        //     return (
        //         <Stack.Screen
        //             name="InitializationError"
        //             options={ErrorScreen.options}
        //             component={() => <ErrorScreen.view error={initializationError} />}
        //         />
        //     );

        // //authenticated show login screens
        // if (isAuthenticated) {
        //     return (
        //         <>
        //             <Stack.Screen name={HomeScreenName} options={HomeScreenHeaderOptions} component={HomeScreen} />
        //         </>
        //     );
        // }

        //Unauthenticated show login screens
        return (
            <>
                {/* <Stack.Screen name={SplashScreenName} options={SplashScreenHeaderOptions} component={SplashScreen} /> */}
                <Stack.Screen
                    name={LoginScreen.LoginScreenName}
                    options={LoginScreen.LoginScreenHeaderOptions}
                    component={LoginScreen.LoginScreen}
                />
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
                {/* <Stack.Screen name={SplashScreenName} options={SplashScreenHeaderOptions} component={SplashScreen} /> */}
                {/* <Stack.Screen
                    name={OnboardingInitial.name}
                    component={OnboardingInitial.view}
                    options={OnboardingInitial.options}
                />
                <Stack.Screen
                    name={OnboardingConfirmation.name}
                    component={OnboardingConfirmation.view}
                    options={OnboardingConfirmation.options}
                />
                <Stack.Screen
                    name={OnBoardingUserDetails.name}
                    component={OnBoardingUserDetails.view}
                    options={OnBoardingUserDetails.options}
                /> */}
            </>
        );
    };

    return (
        // <Stack.Navigator initialRouteName={LoginScreen.LoginScreenName}>{renderStackScreens()}</Stack.Navigator>

        <Stack.Navigator initialRouteName={WorkTaskScreen.WorkTaskScreenName}>{renderStackScreens()}</Stack.Navigator>
    );
};

export default Navigator;
