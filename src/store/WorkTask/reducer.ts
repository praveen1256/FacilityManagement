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
    EVENT_LOGS_LOADING,
    EVENT_LOGS_ERROR,
    EVENT_LOGS_SUCCESS,
    CHILD_WORK_TASKS_ERROR,
    CHILD_WORK_TASKS_LOADING,
    CHILD_WORK_TASKS_SUCCESS,
    SERVICE_REQUEST_ERROR,
    SERVICE_REQUEST_LOADING,
    SERVICE_REQUEST_SUCCESS,
    WORK_TASK_COMPLETE_LOADING,
    WORK_TASK_COMPLETION_DEPENDENCIES_ERROR,
    WORK_TASK_COMPLETION_DEPENDENCIES_LOADING,
    WORK_TASK_COMPLETION_DEPENDENCIES_SUCCESS,
    WORK_TASK_COMPLETE_SUCCESS,
    WORK_TASK_COMPLETE_DONE,
    WORK_TASK_COMMENT_POST_ERROR,
    WORK_TASK_COMMENT_POST_LOADING,
    WORK_TASK_COMMENT_POST_SUCCESS,
    WORK_TASK_COMMENT_POST_DONE,
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

export interface EventLog {
    Comment: string;
    ModifiedDateTime: string;
    Photo: string | null;
    _id: string;
}

export interface FullWorkTask {
    Zip: string;
    CustomerOrganization: string;
    Address: string;
    CompletedBy: unknown;
    TaskPriority: {
        id: number;
        value: string;
    };
    SecondaryUse: string;
    PlannedEnd: string;
    TaskReIssueReason: string;
    Currency: string;
    RequestedByWorkPhone: unknown;
    TaskType: {
        id: number;
        value: string;
    };
    QuoteRequired: boolean;
    ID: string;
    Space: unknown;
    Status: string;
    RequestedByEmail: unknown;
    RequestClass: {
        id: number;
        value: string;
    };
    CreatedBy: string;
    PlannedStart: string;
    RequestedForFullName: string;
    Priority: string;
    RequestedByFullName: string;
    StateProvince: string;
    triTechnicianOnSiteTimeDT: unknown;
    LocationCode: string;
    ResolutionType: string;
    City: string;
    LateCompletionReason: unknown;
    AssetName: unknown;
    RequestedForEmail: unknown;
    TimeCategory: string;
    TaskName: string;
    TimeEntryComment: unknown;
    _id: string;
    PrimaryWorkLocationWT: string;
    PrimaryWorkLocation: string;
    CreatedDateTime: string;
    Building: string;
    cstProblemStabilizedDT: unknown;
    Description: string;
    VRepairID: unknown;
    Hours: string;
    BuildingName: string;
    ModifiedDateTime: string;
    cstCompletedDateTimeDT: unknown;
    CauseType: string;
    Direction: {
        id: number;
        value: string;
    };
    AssignToMe: boolean;
    ServiceClass: string;
    CompletionComment: unknown;
    AssetID: unknown;
    respperson: string;
    TimeEntryDate: string;
    Floor: unknown;
    CreatedFromMobile: string;
    VRepairAlarm: string;
    RepairDefinition: string;
    RequestedForWorkPhone: unknown;
    AdminRetail: string;
    RequestedForLookup: string;
    GeographyLookup: string;
    resporg: string;
    RequestedByLookup: string;
}

export interface ChildTask {
    ParentID: string;
    Status: string;
    RequestClass: string;
    Priority: string;
    TaskType: string;
    _id: string;
    ID: string;
}

export interface ServiceRequest {
    Building: string;
    Space: string;
    Floor: string;
    Description: string;
    ServiceRequested: string;
    Address: string;
    Priority: string;
    StateProvince: string;
    RequiredPropertyUse: string;
    LocationCode: string;
    City: string;
    PRDispatch: string;
    AssignToMe: string;
    SpecificLocation: string;
    BestReachedAt: string;
    Country: string;
    FMVendor: string;
    _id: string;
    ID: string;
    RequestedBy: string;
    RequestedFor: string;
}

export interface CauseType {
    HierarchyPath: string;
    _id: string;
    ParentName: string;
    Name: string;
}

export interface RepairDefinition {
    HierarchyPath: string;
    _id: string;
    ParentName: string;
    Name: string;
}

export interface InitiativeCode {
    _id: string;
    Name: string;
}

export interface LateCompletionReason {
    parentListId: string | null;
    typeId: number;
    _id: string;
    parentValue: string | null;
    parentListValueId: string | null;
    value: string;
    internalValue: string;
    internalParentValue: string | null;
}

export interface WorkTaskState {
    loading: boolean;
    error: string | null;
    workTask: FullWorkTask | null;
    // Timelogs Dependencies - Categories - TODO: Move to a separate reducer
    timeLogCategoriesLoading: boolean;
    timeLogCategoriesError: string | null;
    timeLogCategories: TimeLogCategory[];
    // TimeLogs
    timeLogsLoading: boolean;
    timeLogsError: string | null;
    timeLogs: TimeLogExtended[];
    // Event Logs
    eventLogsLoading: boolean;
    eventLogsError: string | null;
    eventLogs: EventLog[];
    refreshing?: boolean;
    // child tasks
    childTasksLoading: boolean;
    childTasksError: string | null;
    childTasks: ChildTask[];
    // Service Request
    serviceRequestLoading: boolean;
    serviceRequestError: string | null;
    serviceRequest: ServiceRequest | null;
    // worktask complete
    workTaskCompleteLoading: boolean;
    workTaskCompleteError: string | null;
    workTaskCompleteSuccess: boolean;
    completionDependenciesLoading: boolean;
    completionDependencies: {
        causeTypes: CauseType[];
        repairDefinitions: RepairDefinition[];
        initiativeCodes: InitiativeCode[];
        lateCompletionReasons: LateCompletionReason[];
    };
    completionDependenciesError: string | null;
    // Comment Stuff
    commentPostLoading: boolean;
    commentPostError: string | null;
    commentPostSuccess: boolean;
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
    // Event Logs
    eventLogsLoading: false,
    eventLogsError: null,
    eventLogs: [],
    refreshing: false,
    // child tasks
    childTasksLoading: false,
    childTasksError: null,
    childTasks: [],
    // Service Request
    serviceRequestLoading: false,
    serviceRequestError: null,
    serviceRequest: null,
    // worktask complete
    workTaskCompleteLoading: false,
    workTaskCompleteError: null,
    workTaskCompleteSuccess: false,
    completionDependenciesLoading: false,
    completionDependencies: {
        causeTypes: [],
        repairDefinitions: [],
        initiativeCodes: [],
        lateCompletionReasons: [],
    },
    completionDependenciesError: null,
    // Comment Stuff
    commentPostLoading: false,
    commentPostError: null,
    commentPostSuccess: false,
};

export const workTaskReducer = (state: WorkTaskState = initialState, action: ActionInterfaces): WorkTaskState => {
    switch (action.type) {
        case WORK_TASK_LOADING:
            return {
                ...initialState,
                loading: action.refresh ? false : true,
                refreshing: action.refresh,
            };
        case WORK_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                workTask: action.workTask,
                refreshing: false,
                // Removing existing state
                // TODO: Move to a separate action
            };
        case WORK_TASK_ERROR:
            return {
                ...state,
                loading: false,
                refreshing: false,
                error: action.error,
            };
        // TimeLog Categories
        case TIME_LOG_CATEGORIES_LOADING:
            return {
                ...state,
                timeLogCategoriesLoading: true,
                timeLogCategoriesError: null,
                timeLogCategories: [],
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
                timeLogs: [],
                timeLogsError: null,
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
        case EVENT_LOGS_LOADING:
            return {
                ...state,
                eventLogsLoading: true,
                eventLogsError: null,
                eventLogs: [],
            };
        case EVENT_LOGS_SUCCESS:
            return {
                ...state,
                eventLogsLoading: false,
                eventLogsError: null,
                eventLogs: action.eventLogs,
            };

        case EVENT_LOGS_ERROR:
            return {
                ...state,
                eventLogsLoading: false,
                eventLogsError: action.error,
            };

        case CHILD_WORK_TASKS_LOADING:
            return {
                ...state,
                childTasksLoading: true,
                childTasksError: null,
                childTasks: [],
            };
        case CHILD_WORK_TASKS_SUCCESS:
            return {
                ...state,
                childTasksLoading: false,
                childTasksError: null,
                childTasks: [],
            };

        case CHILD_WORK_TASKS_ERROR:
            return {
                ...state,
                childTasksLoading: false,
                childTasksError: action.error,
            };

        case SERVICE_REQUEST_LOADING:
            return {
                ...state,
                serviceRequestLoading: true,
                serviceRequestError: null,
                serviceRequest: null,
            };

        case SERVICE_REQUEST_SUCCESS:
            return {
                ...state,
                serviceRequestLoading: false,
                serviceRequestError: null,
                serviceRequest: action.serviceRequest,
            };
        case SERVICE_REQUEST_ERROR:
            return {
                ...state,
                serviceRequestLoading: false,
                serviceRequestError: action.error,
            };
        // Complete worktask
        case WORK_TASK_COMPLETE_LOADING:
            return {
                ...state,
                workTaskCompleteLoading: true,
                workTaskCompleteError: null,
            };
        case WORK_TASK_COMPLETE_SUCCESS:
            return {
                ...state,
                workTaskCompleteLoading: false,
                workTaskCompleteError: null,
                workTaskCompleteSuccess: true,
            };
        case WORK_TASK_COMPLETE_DONE:
            return {
                ...initialState,
            };
        // Completion Dependencies
        case WORK_TASK_COMPLETION_DEPENDENCIES_LOADING:
            return {
                ...state,
                completionDependenciesLoading: true,
                completionDependenciesError: null,
            };
        case WORK_TASK_COMPLETION_DEPENDENCIES_SUCCESS:
            return {
                ...state,
                completionDependenciesLoading: false,
                completionDependenciesError: null,
                completionDependencies: {
                    ...action.dependencies,
                },
            };
        case WORK_TASK_COMPLETION_DEPENDENCIES_ERROR:
            return {
                ...state,
                completionDependenciesLoading: false,
                completionDependenciesError: action.error,
            };

        case WORK_TASK_COMMENT_POST_LOADING:
            return {
                ...state,
                commentPostLoading: true,
                commentPostError: null,
                commentPostSuccess: false,
            };
        case WORK_TASK_COMMENT_POST_SUCCESS:
            return {
                ...state,
                commentPostLoading: false,
                commentPostError: null,
                commentPostSuccess: true,
            };
        case WORK_TASK_COMMENT_POST_ERROR:
            return {
                ...state,
                commentPostLoading: false,
                commentPostError: action.error,
                commentPostSuccess: false,
            };
        case WORK_TASK_COMMENT_POST_DONE:
            return {
                ...state,
                commentPostLoading: false,
                commentPostError: null,
                commentPostSuccess: false,
            };
        default:
            return {
                ...state,
            };
    }
};
