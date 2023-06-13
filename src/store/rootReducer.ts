import { combineReducers } from "redux";

import { appReducer } from "./App/reducer";
import { authReducer } from "./Authentication/reducer";
import { taskReducer } from "./WorkTasks/reducer";

export const rootReducer = () =>
    combineReducers({
        app: appReducer,
        auth: authReducer,
        tasks: taskReducer,
    });
