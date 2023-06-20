import { WorkTask } from "../WorkTasks/reducer";

import {
    WORK_TASK_ERROR,
    TIME_LOGS_ERROR,
    TIME_LOGS_LOADING,
    TIME_LOGS_SUCCESS,
    WORK_TASK_SUCCESS,
    WORK_TASK_LOADING,
    TIME_LOG_DELETE,
    TIME_LOG_DELETE_SUCCESS,
    TIME_LOG_DELETE_ERROR,
    TIME_LOG_CATEGORIES_ERROR,
    TIME_LOG_CATEGORIES_LOADING,
    TIME_LOG_CATEGORIES_SUCCESS,
    TIME_LOG_CREATE,
    TIME_LOG_CREATE_SUCCESS,
    TIME_LOG_CREATE_ERROR,
    TIME_LOG_RESET,
} from "./actionTypes";
import { ActionInterfaces } from "./actionInterfaces";

export interface TimeLog {
    Category: string;
    Description: string;
    Hours: string;
    ResourceType: string;
    _id: string;
    Date: string;
    Name: string;
}

export interface TimeLogCategory {
    _id: string;
    Name: string;
}

export interface TimeLogExtended extends TimeLog {
    isLoading?: boolean;
    error?: string | null;
    loadingMessage?: string | null;
    errorMode?: "DELETE" | "CREATE" | null;
}

export interface WorkTaskState {
    loading: boolean;
    error: string | null;
    workTask: WorkTask | null;
    // Timelogs Dependencies - Categories - TODO: Move to a separate reducer
    timeLogCategoriesLoading: boolean;
    timeLogCategoriesError: string | null;
    timeLogCategories: TimeLogCategory[];
    // TimeLogs
    timeLogsLoading: boolean;
    timeLogsError: string | null;
    timeLogs: TimeLogExtended[];
}

const initialState: WorkTaskState = {
    loading: false,
    error: null,
    workTask: null,
    // Timelogs Dependencies - Categories - TODO: Move to a separate reducer
    timeLogCategoriesLoading: false,
    timeLogCategoriesError: null,
    timeLogCategories: [],
    // TimeLogs
    timeLogsLoading: false,
    timeLogsError: null,
    timeLogs: [],
};

export const workTaskReducer = (state: WorkTaskState = initialState, action: ActionInterfaces): WorkTaskState => {
    switch (action.type) {
        case WORK_TASK_LOADING:
            return {
                ...initialState,
                loading: true,
            };
        case WORK_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                workTask: action.workTask,
            };
        case WORK_TASK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // TimeLog Categories
        case TIME_LOG_CATEGORIES_LOADING:
            return {
                ...state,
                timeLogCategoriesLoading: true,
            };

        case TIME_LOG_CATEGORIES_SUCCESS:
            return {
                ...state,
                timeLogCategoriesLoading: false,
                timeLogCategoriesError: null,
                timeLogCategories: action.timeLogCategories,
            };
        case TIME_LOG_CATEGORIES_ERROR:
            return {
                ...state,
                timeLogCategoriesLoading: false,
                timeLogCategoriesError: action.error,
            };
        // TimeLogs
        case TIME_LOGS_LOADING:
            return {
                ...state,
                timeLogsLoading: true,
            };
        case TIME_LOGS_SUCCESS:
            return {
                ...state,
                timeLogsLoading: false,
                timeLogsError: null,
                timeLogs: action.timeLogs.map((timeLog) => ({
                    ...timeLog,
                    isLoading: false,
                    error: null,
                    loadingMessage: null,
                })),
            };
        case TIME_LOGS_ERROR:
            return {
                ...state,
                timeLogsLoading: false,
                timeLogsError: action.error,
            };
        case TIME_LOG_DELETE:
            return {
                ...state,
                timeLogs: state.timeLogs.map((timeLog) => {
                    if (timeLog._id === action.timeLogId) {
                        return {
                            ...timeLog,
                            isLoading: true,
                            error: null,
                            loadingMessage: "Deleting...",
                        };
                    }
                    return timeLog;
                }),
            };
        case TIME_LOG_DELETE_SUCCESS:
            return {
                ...state,
                timeLogs: state.timeLogs.filter((timeLog) => timeLog._id !== action.timeLogId),
            };
        case TIME_LOG_DELETE_ERROR:
            return {
                ...state,
                timeLogs: state.timeLogs.map((timeLog) => {
                    if (timeLog._id === action.timeLogId) {
                        return {
                            ...timeLog,
                            isLoading: false,
                            error: action.error,
                            errorMode: "DELETE",
                            loadingMessage: null,
                        };
                    }
                    return timeLog;
                }),
            };
        // Create TimeLog
        case TIME_LOG_CREATE:
            // If the create mode is retry, we need to find the timeLog and update its loading state
            if (action.mode === "RETRY") {
                return {
                    ...state,
                    timeLogs: state.timeLogs.map((timeLog) => {
                        if (timeLog._id === action.timeLog._id) {
                            return {
                                ...timeLog,
                                isLoading: true,
                                error: null,
                                loadingMessage: "Creating...",
                                errorMode: null,
                            };
                        }
                        return timeLog;
                    }),
                };
            }
            return {
                ...state,
                timeLogs: [
                    ...state.timeLogs,
                    {
                        ...action.timeLog,
                        isLoading: true,
                        error: null,
                        loadingMessage: "Creating...",
                        errorMode: null,
                    },
                ],
            };
        case TIME_LOG_CREATE_SUCCESS:
            return {
                ...state,
                timeLogs: state.timeLogs.map((timeLog) => {
                    if (timeLog._id === action.pseudoId) {
                        return {
                            ...action.timeLog,
                            isLoading: false,
                            error: null,
                            loadingMessage: null,
                        };
                    }
                    return timeLog;
                }),
            };
        case TIME_LOG_CREATE_ERROR:
            return {
                ...state,
                timeLogs: state.timeLogs.map((timeLog) => {
                    // Since the timeLog is not created yet, we can use the pseudoId to identify it
                    if (timeLog._id === action.timeLog._id) {
                        return {
                            ...timeLog,
                            isLoading: false,
                            error: action.error,
                            loadingMessage: null,
                            errorMode: "CREATE",
                        };
                    }
                    return timeLog;
                }),
            };

        case TIME_LOG_RESET:
            if (action.clearMode === "DELETE") {
                return {
                    ...state,
                    timeLogs: state.timeLogs.filter((timeLog) => timeLog._id !== action.timeLogId),
                };
            }
            return {
                ...state,
                timeLogs: state.timeLogs.map((timeLog) => {
                    if (timeLog._id === action.timeLogId) {
                        return {
                            ...timeLog,
                            isLoading: false,
                            error: null,
                            loadingMessage: null,
                            errorMode: null,
                        };
                    }
                    return timeLog;
                }),
            };
        default:
            return {
                ...state,
            };
    }
};
