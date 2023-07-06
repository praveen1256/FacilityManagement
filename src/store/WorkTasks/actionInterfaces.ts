import { FullWorkTask } from "../WorkTask/reducer";

import {
    WORK_TASKS_LOADING,
    WORK_TASKS_SUCCESS,
    WORK_TASKS_ERROR,
    COUNT_LOADING,
    COUNT_SUCCESS,
    COUNT_ERROR,
    MOVE_TASK_TO_COMPLETED,
} from "./actionTypes";

export interface WorkTaskInterface {
    Building: string;
    Description: string;
    Address: string;
    TaskPriority: string;
    ModifiedDateTime: string;
    SRCreatedDateTime: string;
    LegacyGLC: null;
    ServiceClass: string;
    ResourceAssignmentStatus: string;
    PlannedEnd: string;
    TaskReIssueReason: string;
    Currency: string;
    TaskType: string;
    SRRecordID: string;
    ID: string;
    SRDescription: string;
    SRID: string;
    EquipmentAlias: null;
    Status: string;
    CreatedFromMobile: string;
    RequestClass: string;
    PlannedStart: string;
    LocationCode: string;
    SRServiceRequested: string;
    ResolutionType: string;
    City: string;
    TaskName: string;
    State: string;
    _id: string;
    PrimaryWorkLocation: string;
    CreatedDateTime: string;
}

export interface WorkTasksLoading {
    type: typeof WORK_TASKS_LOADING;
}

export interface WorkTasksSuccess {
    type: typeof WORK_TASKS_SUCCESS;
    countP1Tasks: WorkTaskInterface[];
    countP2P7Tasks: WorkTaskInterface[];
    countOverDueTasks: WorkTaskInterface[];
    countDueTodayTasks: WorkTaskInterface[];
    countCompletedTasks: WorkTaskInterface[];
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
