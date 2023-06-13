import { WORK_TASKS_LOADING, WORK_TASKS_SUCCESS, WORK_TASKS_ERROR } from "./actionTypes";

export interface WorkTasksLoading {
    type: typeof WORK_TASKS_LOADING;
}

export interface WorkTasksSuccess {
    type: typeof WORK_TASKS_SUCCESS;
    tasks: any;
}

export interface WorkTasksError {
    type: typeof WORK_TASKS_ERROR;
    error: string;
}

export type ActionInterfaces = WorkTasksLoading | WorkTasksSuccess | WorkTasksError;

export const pureActionCreator = <T extends ActionInterfaces["type"]>(
    type: T,
    options: Omit<Extract<ActionInterfaces, { type: T }>, "type">,
) => ({
    type,
    ...options,
});
