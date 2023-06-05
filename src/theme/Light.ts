import { MD3LightTheme as DefaultTheme } from "react-native-paper";
// eslint-disable-next-line import/no-unresolved
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";

export const theme: ThemeProp = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(255, 45, 85)",
    },
};
