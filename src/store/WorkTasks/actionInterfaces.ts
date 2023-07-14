import { FullWorkTask } from "../WorkTask/reducer";

import {
    WORK_TASKS_LOADING,
    WORK_TASKS_SUCCESS,
    WORK_TASKS_ERROR,
    SELECTED_CARD,
    COUNT_LOADING,
    COUNT_SUCCESS,
    COUNT_ERROR,
    MOVE_TASK_TO_COMPLETED,
} from "./actionTypes";
import { WorkTask } from "./reducer";

export interface WorkTasksLoading {
    type: typeof WORK_TASKS_LOADING;
}

export interface WorkTasksSelectedCard {
    type: typeof SELECTED_CARD;
    selectedCardIndex: number;
}

export interface WorkTasksSuccess {
    type: typeof WORK_TASKS_SUCCESS;
    allTasks: WorkTask[];
    selectedCard: number;
}

export interface WorkTasksError {
    type: typeof WORK_TASKS_ERROR;
    error: string;
}

export interface CountLoading {
    type: typeof COUNT_LOADING;
}

export interface CountSuccess {
    type: typeof COUNT_SUCCESS;
    countP1: 0;
    countP2P7: 0;
    countOverDue: 0;
    countDueToday: 0;
    countCompleted: 0;
}

export interface CountError {
    type: typeof COUNT_ERROR;
    error: string;
}

export interface MoveWorkTaskToCompleted {
    type: typeof MOVE_TASK_TO_COMPLETED;
    workTask: FullWorkTask;
}

export type ActionInterfaces =
    | WorkTasksLoading
    | WorkTasksSelectedCard
    | WorkTasksSuccess
    | WorkTasksError
    | CountLoading
    | CountSuccess
    | CountError
    | MoveWorkTaskToCompleted;

export const pureActionCreator = <T extends ActionInterfaces["type"]>(
    type: T,
    options: Omit<Extract<ActionInterfaces, { type: T }>, "type">,
) => ({
    type,
    ...options,
});
