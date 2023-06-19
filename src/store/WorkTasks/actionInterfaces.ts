import { WORK_TASKS_LOADING, WORK_TASKS_SUCCESS, WORK_TASKS_ERROR } from "./actionTypes";

export interface WorkTasksLoading {
    type: typeof WORK_TASKS_LOADING;
}

export interface WorkTasksSuccess {
    type: typeof WORK_TASKS_SUCCESS;
    // TODO: fix me
    tasks: {
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
    }[];
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
