import { MD3LightTheme } from "react-native-paper";
// eslint-disable-next-line import/no-unresolved

export const theme = {
    ...MD3LightTheme,
    myOwnProperty: true,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#CD040B",
        secondary: "#000000",
        tertiary: "#7b1fa2",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - these are custom properties
        p1: "#990000",
        onP1Container: "teal",
        p2: "#FF6600",
        onP2Container: "#000000",
        corrective: "#800000",
        onCorrectiveContainer: "#FFFFFF",
        preventative: "#556B2F",
        onPreventativeContainer: "#FFFFFF",
    },
};
