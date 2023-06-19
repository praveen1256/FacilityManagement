import axios, { AxiosError } from "axios";

import { AppThunkAction } from "../index";

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
} from "./actionTypes";
import { TimeLog } from "./reducer";

// Timelog categories loading action
export const loadTimeLogCategories = (): AppThunkAction<ActionInterfaces> => async (dispatch, _getState) => {
    dispatch(pureActionCreator(TIME_LOG_CATEGORIES_LOADING, {}));
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
            // const state = getState();
            // Call the delete API
            const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
            await delay(6000);
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
    (workTaskId: string, timeLog: Omit<TimeLog, "_id" | "Name" | "ResourceType">): AppThunkAction<ActionInterfaces> =>
    async (dispatch, _getState) => {
        const pseudoId = "PsuedoId-" + Math.random().toString(); // this is just for the UI to show the new timelog

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
            }),
        );

        try {
            // const state = getState();
            // TODO: Call the create API
            const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
            await delay(3000);

            dispatch(
                pureActionCreator(TIME_LOG_CREATE_SUCCESS, {
                    timeLog: {
                        ...timeLog,
                        _id: pseudoId,
                        Name: "Psuedo Name",
                        ResourceType: "Posting...",
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
