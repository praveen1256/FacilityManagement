import {
    TIME_LOGS_ERROR,
    TIME_LOGS_LOADING,
    TIME_LOGS_SUCCESS,
    TIME_LOG_DELETE,
    TIME_LOG_DELETE_ERROR,
    TIME_LOG_DELETE_SUCCESS,
    TIME_LOG_CREATE,
    TIME_LOG_CREATE_ERROR,
    TIME_LOG_CREATE_SUCCESS,
    TIME_LOG_CATEGORIES_ERROR,
    TIME_LOG_CATEGORIES_LOADING,
    TIME_LOG_CATEGORIES_SUCCESS,
    WORK_TASK_ERROR,
    WORK_TASK_LOADING,
    WORK_TASK_SUCCESS,
    TIME_LOG_RESET,
    EVENT_LOGS_ERROR,
    EVENT_LOGS_LOADING,
    EVENT_LOGS_SUCCESS,
    CHILD_WORK_TASKS_ERROR,
    CHILD_WORK_TASKS_LOADING,
    CHILD_WORK_TASKS_SUCCESS,
    SERVICE_REQUEST_ERROR,
    SERVICE_REQUEST_LOADING,
    SERVICE_REQUEST_SUCCESS,
    WORK_TASK_COMPLETE_ERROR,
    WORK_TASK_COMPLETE_LOADING,
    WORK_TASK_COMPLETE_SUCCESS,
} from "./actionTypes";
import { ChildTask, EventLog, FullWorkTask, ServiceRequest, TimeLog, TimeLogCategory } from "./reducer";
export interface WorkTaskLoading {
    type: typeof WORK_TASK_LOADING;
    refresh?: boolean;
}

export interface WorkTaskSuccess {
    type: typeof WORK_TASK_SUCCESS;
    // TODO: fix me
    workTask: FullWorkTask;
}

export interface WorkTaskError {
    type: typeof WORK_TASK_ERROR;
    error: string;
}

export interface TimeLogsLoading {
    type: typeof TIME_LOGS_LOADING;
}

export interface TimeLogsSuccess {
    type: typeof TIME_LOGS_SUCCESS;
    timeLogs: TimeLog[];
}

export interface TimeLogsError {
    type: typeof TIME_LOGS_ERROR;
    error: string;
}

// Timelog Delete Actions
export interface TimeLogDelete {
    type: typeof TIME_LOG_DELETE;
    timeLogId: string;
    workTaskId: string;
}

export interface TimeLogDeleteSuccess {
    type: typeof TIME_LOG_DELETE_SUCCESS;
    timeLogId: string;
    workTaskId: string;
}

export interface TimeLogDeleteError {
    type: typeof TIME_LOG_DELETE_ERROR;
    error: string;
    timeLogId: string;
    workTaskId: string;
}

// Timelog Categories Loading Actions
export interface TimeLogCategoriesLoading {
    type: typeof TIME_LOG_CATEGORIES_LOADING;
}

export interface TimeLogCategoriesSuccess {
    type: typeof TIME_LOG_CATEGORIES_SUCCESS;
    timeLogCategories: TimeLogCategory[];
}

export interface TimeLogCategoriesError {
    type: typeof TIME_LOG_CATEGORIES_ERROR;
    error: string;
}

// Timelog Create Actions
export interface TimeLogCreate {
    type: typeof TIME_LOG_CREATE;
    timeLog: TimeLog;
    workTaskId: string;
    mode: "CREATE" | "RETRY";
}

export interface TimeLogReset {
    type: typeof TIME_LOG_RESET;
    clearMode: "DELETE" | "ERROR";
    workTaskId: string;
    timeLogId: string;
}

export interface TimeLogCreateSuccess {
    type: typeof TIME_LOG_CREATE_SUCCESS;
    timeLog: TimeLog;
    workTaskId: string;
    pseudoId: string; // This will be used to identify the timeLog in the store until it gets an id from the server
}

export interface TimeLogCreateError {
    type: typeof TIME_LOG_CREATE_ERROR;
    error: string;
    timeLog: TimeLog;
    workTaskId: string;
}

export interface EventLogLoading {
    type: typeof EVENT_LOGS_LOADING;
}

export interface EventLogSuccess {
    type: typeof EVENT_LOGS_SUCCESS;
    eventLogs: EventLog[];
}

export interface EventLogError {
    type: typeof EVENT_LOGS_ERROR;
    error: string;
}

// Child work task actions
export interface ChildWorkTasksLoading {
    type: typeof CHILD_WORK_TASKS_LOADING;
}

export interface ChildWorkTasksSuccess {
    type: typeof CHILD_WORK_TASKS_SUCCESS;
    tasks: ChildTask[]; // TODO: need to check!!
}

export interface ChildWorkTasksError {
    type: typeof CHILD_WORK_TASKS_ERROR;
    error: string;
}

// Service Request Actions
export interface ServiceRequestLoading {
    type: typeof SERVICE_REQUEST_LOADING;
}

export interface ServiceRequestSuccess {
    type: typeof SERVICE_REQUEST_SUCCESS;
    serviceRequest: ServiceRequest | null;
}

export interface ServiceRequestError {
    type: typeof SERVICE_REQUEST_ERROR;
    error: string;
}

// Work Task Complete Actions
export interface WorkTaskCompleteLoading {
    type: typeof WORK_TASK_COMPLETE_LOADING;
}

export interface WorkTaskCompleteSuccess {
    type: typeof WORK_TASK_COMPLETE_SUCCESS;
    // TODO: think if we need to add something here
}

export interface WorkTaskCompleteError {
    type: typeof WORK_TASK_COMPLETE_ERROR;
    error: string;
}

export type ActionInterfaces =
    | WorkTaskLoading
    | WorkTaskSuccess
    | WorkTaskError
    | TimeLogsLoading
    | TimeLogsSuccess
    | TimeLogsError
    | TimeLogDelete
    | TimeLogDeleteSuccess
    | TimeLogDeleteError
    | TimeLogCreate
    | TimeLogCreateSuccess
    | TimeLogCreateError
    | TimeLogCategoriesLoading
    | TimeLogCategoriesSuccess
    | TimeLogCategoriesError
    | TimeLogReset
    | EventLogLoading
    | EventLogSuccess
    | EventLogError
    | ChildWorkTasksLoading
    | ChildWorkTasksSuccess
    | ChildWorkTasksError
    | ServiceRequestLoading
    | ServiceRequestSuccess
    | ServiceRequestError
    | WorkTaskCompleteLoading
    | WorkTaskCompleteSuccess
    | WorkTaskCompleteError;

export const pureActionCreator = <T extends ActionInterfaces["type"]>(
    type: T,
    options: Omit<Extract<ActionInterfaces, { type: T }>, "type">,
) => ({
    type,
    ...options,
});
