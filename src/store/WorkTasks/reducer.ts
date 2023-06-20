import { WORK_TASKS_LOADING, WORK_TASKS_SUCCESS, WORK_TASKS_ERROR } from "./actionTypes";
import { ActionInterfaces } from "./actionInterfaces";

export interface WorkTask {
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

export interface AppState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    tasks: WorkTask[];
}

const initialState: AppState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    tasks: [],
};

export const workTasksReducer = (state: AppState = initialState, action: ActionInterfaces): AppState => {
    switch (action.type) {
        case WORK_TASKS_LOADING:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case WORK_TASKS_SUCCESS:
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
