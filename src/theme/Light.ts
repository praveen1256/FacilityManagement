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
        p2: "teal",
        onP2Container: "white",

        corrective: "black",
        onCorrectiveContainer: "white",
        preventative: "black",
        onPreventativeContainer: "white",
    },
};
