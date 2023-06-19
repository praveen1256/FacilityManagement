import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { rootReducer } from "./rootReducer";
import { configureStore } from "./configureStore";
import * as App from "./App";
import * as Authentication from "./Authentication";
import * as WorkTasks from "./WorkTasks";
import * as WorkTask from "./WorkTask";

//ApplicationState
export type RootState = ReturnType<ReturnType<typeof rootReducer>>;
//Application Actions
//TODO: Add all the actions here
export type RootActions =
    | App.ActionInterfaces
    | Authentication.ActionInterfaces
    | WorkTasks.ActionInterfaces
    | WorkTask.ActionInterfaces;
//Application Store
export type RootStore = ReturnType<typeof configureStore>;
//ThunkAction Interface
export type AppThunkAction<A extends RootActions = RootActions> = ThunkAction<void, RootState, void, A>;
// //ThunkDispatch Interface
export type AppThunkDispatch<T extends RootActions = RootActions> = ThunkDispatch<RootState, undefined, T>;
//ReduxConnector Interface
//SubStores Exports Start
export { App, Authentication, WorkTasks, WorkTask };
//SubStores Exports Start
