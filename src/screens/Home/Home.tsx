/**
 * Please donot delete this screen, Its there for reference as a boilerplate!!
 */

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StatusBar, Text, useColorScheme } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import ComponentsTester from "../../components/ComponentsTester";
interface HomeScreenProps {
    isAuthStateInitialized?: boolean;
    // onPressContinue: () => void;
}

const HomeScreenView: React.FunctionComponent<HomeScreenProps> = () => {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <Text>Facility Management.... Hello...</Text>
                <ComponentsTester />
            </SafeAreaView>
        </>
    );
};

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
export const HomeScreenHeaderOptions = HeaderOptions;
export const HomeScreenName = "HomeScreen";
export const HomeScreen = HomeScreenView;
