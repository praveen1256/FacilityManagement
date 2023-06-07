import React from "react";
import "reflect-metadata";
import { AppRegistry } from "react-native";

import App from "./src/App";
import { name as appName } from "./app.json";
import { configureStore } from "./src/store/configureStore";

const store = configureStore();

const AppWrapper = () => <App store={store} />;

AppRegistry.registerComponent(appName, () => AppWrapper);
