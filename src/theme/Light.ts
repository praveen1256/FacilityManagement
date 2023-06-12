import { MD3LightTheme } from "react-native-paper";
// eslint-disable-next-line import/no-unresolved
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";

export const theme: ThemeProp = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#D52B1E",
        // Verizon colors
        // black: "#000000",
        // red: "#D52B1E",
    },
};
