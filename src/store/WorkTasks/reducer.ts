import { WORK_TASKS_LOADING, WORK_TASKS_SUCCESS, WORK_TASKS_ERROR } from "./actionTypes";
import { ActionInterfaces } from "./actionInterfaces";

export interface AppState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    tasks: any;
}

const initialState: AppState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    tasks: "",
};

export const taskReducer = (state: AppState = initialState, action: ActionInterfaces): AppState => {
    switch (action.type) {
        case WORK_TASKS_LOADING:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case WORK_TASKS_SUCCESS:
            // const navigationContainer = container.resolve(NavigationService);
            // navigationContainer.navigate(WorkTasksScreenName, undefined);
            // console.log("WORK_TASKS_SUCCESS : ", action.tasks);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                tasks: action.tasks,
            };
        case WORK_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return {
                ...state,
            };
    }
};