import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
// import { container } from "tsyringe";

import { AppThunkAction } from "../index";
import { WorkTask } from "../WorkTasks/reducer";
import { ANIMATION_DELAY_MS, testingDelay } from "../../EnableAnimationsDelay";

import { ActionInterfaces, pureActionCreator } from "./actionInterfaces";
import {
    TIME_LOGS_ERROR,
    TIME_LOGS_LOADING,
    TIME_LOGS_SUCCESS,
    TIME_LOG_DELETE,
    TIME_LOG_DELETE_SUCCESS,
    TIME_LOG_DELETE_ERROR,
    TIME_LOG_CREATE,
    TIME_LOG_CREATE_SUCCESS,
    TIME_LOG_CREATE_ERROR,
    TIME_LOG_CATEGORIES_LOADING,
    TIME_LOG_CATEGORIES_SUCCESS,
    TIME_LOG_CATEGORIES_ERROR,
    TIME_LOG_RESET,
    WORK_TASK_ERROR,
    WORK_TASK_SUCCESS,
    EVENT_LOGS_ERROR,
    EVENT_LOGS_LOADING,
    EVENT_LOGS_SUCCESS,
} from "./actionTypes";
import { EventLog, TimeLog } from "./reducer";

export const loadWorkTask =
    (workTaskId: WorkTask["_id"]): AppThunkAction<ActionInterfaces> =>
    async (dispatch, getState) => {
        const workTask = getState().worktasks.tasks.find((task) => task._id === workTaskId);
        if (!workTask) {
            // Navigate back or show alert with error
            return;
        }

        await testingDelay();

        // dispatch(pureActionCreator(WORK_TASK_LOADING, {}));
        try {
            // const state = getState();
            // await axios.get(`https://verizon-dev2.tririga.com/oslc/login?USERNAME=1446144475&PASSWORD=password`);
            // const url = "https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/COUNT_P2P3";
            // const response = await axios.get(url);
            dispatch(
                pureActionCreator(WORK_TASK_SUCCESS, {
                    workTask: workTask,
                }),
            );
            // // Navigate to the work task screen
            // const navigationContainer = container.resolve(NavigationService);
            // navigationContainer.navigate(WorkTaskScreen.WorkTaskScreenName, undefined);
        } catch (error) {
            const err = error as AxiosError;
            dispatch(pureActionCreator(WORK_TASK_ERROR, { error: err.message }));
        }
    };
// Timelog categories loading action
export const loadTimeLogCategories = (): AppThunkAction<ActionInterfaces> => async (dispatch, getState) => {
    // If the categories are already loaded, don't load them again
    const timeLogCategories = getState().workTask.timeLogCategories.length > 0;
    if (timeLogCategories) {
        // Timelogs are already loaded, so no need to load them again
        return;
    }

    dispatch(pureActionCreator(TIME_LOG_CATEGORIES_LOADING, {}));

    await testingDelay(ANIMATION_DELAY_MS * 3);
    try {
        // const state = getState();
        await axios.get(`https://verizon-dev2.tririga.com/oslc/login?USERNAME=1446144475&PASSWORD=password`);
        const url =
            "https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/cstTimeCategory?countOnly=false";
        const response = await axios.get(url);
        dispatch(pureActionCreator(TIME_LOG_CATEGORIES_SUCCESS, { timeLogCategories: response.data.data }));
    } catch (error) {
        const err = error as AxiosError;
        dispatch(pureActionCreator(TIME_LOG_CATEGORIES_ERROR, { error: err.message || "Something went wrong" }));
    }
};

export const loadTimeLogs =
    (workTaskId: string): AppThunkAction<ActionInterfaces> =>
    async (dispatch, _getState) => {
        dispatch(pureActionCreator(TIME_LOGS_LOADING, {}));
        try {
            // const state = getState();
            // TODO: move login somewhere else
            await axios.get(`https://verizon-dev2.tririga.com/oslc/login?USERNAME=1446144475&PASSWORD=password`);

            const url = `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/cstWorkTaskDetails/${workTaskId}/cstTMLog?countOnly=false`;
            const response = await axios.get(url);

            await testingDelay(ANIMATION_DELAY_MS * 2);

            dispatch(pureActionCreator(TIME_LOGS_SUCCESS, { timeLogs: response.data.data }));
        } catch (error) {
            const err = error as AxiosError;
            dispatch(pureActionCreator(TIME_LOGS_ERROR, { error: err.message || "Something went wrong" }));
        }
    };

export const deleteTimeLog =
    (workTaskId: string, timeLogId: string): AppThunkAction<ActionInterfaces> =>
    async (dispatch, _getState) => {
        dispatch(
            pureActionCreator(TIME_LOG_DELETE, {
                timeLogId,
                workTaskId,
            }),
        );
        try {
            // Testing
            await testingDelay();
            // throw new Error("Testing");

            const url = `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/cstWorkTaskDetails/${workTaskId}/cstTMLog?method=delete&actionGroup=actions&action=delete`;

            await axios.post(url, {
                data: {
                    _id: timeLogId,
                },
            });

            dispatch(
                pureActionCreator(TIME_LOG_DELETE_SUCCESS, {
                    timeLogId,
                    workTaskId,
                }),
            );
        } catch (error) {
            const err = error as AxiosError;
            dispatch(
                pureActionCreator(TIME_LOG_DELETE_ERROR, {
                    error: err.message || "Something went wrong",
                    timeLogId,
                    workTaskId,
                }),
            );
        }
    };

// Timelog Create Action
export const createTimeLog =
    (
        workTaskId: string,
        serviceRequestId: string,
        timeLog: Omit<TimeLog, "_id" | "Name" | "ResourceType">,
        existingPseudoId?: string,
    ): AppThunkAction<ActionInterfaces> =>
    async (dispatch, _getState) => {
        const pseudoId = existingPseudoId || "PsuedoId-" + Math.random().toString(); // this is just for the UI to show the new timelog

        const timelogWithPseudoId: TimeLog = {
            ...timeLog,
            _id: pseudoId,
            Name: "Posting...",
            ResourceType: "Posting...",
        };

        dispatch(
            pureActionCreator(TIME_LOG_CREATE, {
                timeLog: timelogWithPseudoId,
                workTaskId,
                mode: existingPseudoId ? "RETRY" : "CREATE",
            }),
        );

        // Modify the description to include the mobile tag
        timeLog.Description = `Mobile - ${timeLog.Description}`;

        const getCacheKey = (timeLog: Omit<TimeLog, "_id" | "Name" | "ResourceType">) => {
            return `timeLogs-${workTaskId}-${timeLog.Category}-${timeLog.Hours}-${timeLog.Description}`;
        };
        // We need this cache key to prevent duplicate timelogs from being created
        // Because the server doesn't return the created timelog, we can't use the _id
        // because its a different value then one we get from creating the timelog
        const cacheKey = getCacheKey(timeLog);

        try {
            // const state = getState();
            // TODO: Call the create API

            // // Testing
            await testingDelay();
            // throw new Error("Testing");

            const url = `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/cstHelper?actionGroup=actions&action=calculate&refresh=true`;
            const postData = {
                triInput1TX: "timeLogEntry",
                triInput2TX: serviceRequestId,
                triInput5TX: dayjs(timeLog.Date).format("M/D/YYYY"),
                triInput3TX: timeLog.Category,
                triInput1NU: timeLog.Hours,
                triInput4TX: timeLog.Description,
            };

            await axios.post<{
                createdRecordId: string;
            }>(url, {
                data: postData,
            });

            // Allow Breathing room for the Server to create the timelog
            const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
            await delay(4000);

            // Fetch all the timelogs again
            const timeLogsUrl = `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/cstWorkTaskDetails/${workTaskId}/cstTMLog?countOnly=false`;
            const timeLogsRes = await axios.get<{
                data: TimeLog[];
            }>(timeLogsUrl);

            const foundCreatedTimeLog = timeLogsRes.data.data.find((tl) => {
                return getCacheKey(tl) === cacheKey;
            });

            if (!foundCreatedTimeLog) {
                throw new Error("Could not find the created timelog");
            }

            // Check for the one with the pseudoId and replace it with the new one
            dispatch(
                pureActionCreator(TIME_LOG_CREATE_SUCCESS, {
                    timeLog: {
                        ...foundCreatedTimeLog,
                    },
                    workTaskId,
                    pseudoId: pseudoId,
                }),
            );
        } catch (error) {
            const err = error as AxiosError;
            dispatch(
                pureActionCreator(TIME_LOG_CREATE_ERROR, {
                    error: err.message || "Something went wrong",
                    timeLog: timelogWithPseudoId,
                    workTaskId,
                }),
            );
        }
    };

// Time log clear error state
export const onTimeLogCancelRetry =
    (workTaskId: string, timeLogId: string, clearMode: "DELETE" | "ERROR"): AppThunkAction<ActionInterfaces> =>
    async (dispatch, _getState) => {
        // Dispatch an action with clear mode
        dispatch(
            pureActionCreator(TIME_LOG_RESET, {
                clearMode,
                timeLogId,
                workTaskId,
            }),
        );
    };

// Load all the events for the work task
export const loadEvents =
    (workTaskId: string): AppThunkAction<ActionInterfaces> =>
    async (dispatch, _getState) => {
        dispatch(pureActionCreator(EVENT_LOGS_LOADING, {}));
        try {
            const url = `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/cstWorkTaskDetails/${workTaskId}/cstEventLog?countOnly=false&query=true`;
            const res = await axios.get<{
                data: EventLog[];
            }>(url);

            await testingDelay(ANIMATION_DELAY_MS * 2);

            dispatch(
                pureActionCreator(EVENT_LOGS_SUCCESS, {
                    eventLogs: res.data.data,
                }),
            );
        } catch (error) {
            const err = error as AxiosError;
            dispatch(
                pureActionCreator(EVENT_LOGS_ERROR, {
                    error: err.message || "Something went wrong",
                }),
            );
        }
    };
