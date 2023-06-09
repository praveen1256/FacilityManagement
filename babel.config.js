module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    // Adding this allows namespaces to be exported, ex: export * as HomeScreen from "./Home"
    plugins: [
        "@babel/plugin-proposal-export-namespace-from",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "react-native-reanimated/plugin",
    ],
};
