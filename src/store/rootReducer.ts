import { combineReducers } from "redux";

import { appReducer } from "./App/reducer";
import { authReducer } from "./Authentication/reducer";
import { workTaskReducer } from "./WorkTask/reducer";
import { workTasksReducer } from "./WorkTasks/reducer";

export const rootReducer = () =>
    combineReducers({
        app: appReducer,
        auth: authReducer,
        worktasks: workTasksReducer,
        workTask: workTaskReducer,
    });
