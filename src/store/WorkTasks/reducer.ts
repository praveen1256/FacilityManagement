import {
    WORK_TASKS_LOADING,
    WORK_TASKS_SUCCESS,
    WORK_TASKS_ERROR,
    COUNT_LOADING,
    COUNT_SUCCESS,
    COUNT_ERROR,
    MOVE_TASK_TO_COMPLETED,
    SELECTED_CARD,
} from "./actionTypes";
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
    allTasks: WorkTask[];
    countP1: number;
    countP2P7: number;
    countOverDue: number;
    countDueToday: number;
    countCompleted: number;
    selectedCard: number;
}

const initialState: AppState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    allTasks: [],
    countP1: 0,
    countP2P7: 0,
    countOverDue: 0,
    countDueToday: 0,
    countCompleted: 0,
    selectedCard: 0,
};

export const workTasksReducer = (state: AppState = initialState, action: ActionInterfaces): AppState => {
    switch (action.type) {
        case WORK_TASKS_LOADING:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case SELECTED_CARD:
            return {
                ...state,
                selectedCard: action.selectedCardIndex,
            };
        case WORK_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                allTasks: action.allTasks,
                selectedCard: action.selectedCard,
            };
        case WORK_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case COUNT_LOADING:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case COUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                countP1: action.countP1,
                countP2P7: action.countP2P7,
                countOverDue: action.countOverDue,
                countDueToday: action.countDueToday,
                countCompleted: action.countCompleted,
            };
        case COUNT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case MOVE_TASK_TO_COMPLETED:
            return {
                ...state,
                // ResourceAssignmentStatus = "Completed"
                // Status = "Completed"
                allTasks: state.allTasks.map((task) => {
                    if (task._id === action.workTask._id) {
                        return {
                            ...task,
                            ResourceAssignmentStatus: "Completed",
                            Status: "Completed",
                        };
                    }
                    return task;
                }),
            };
        default:
            return {
                ...state,
            };
    }
};
