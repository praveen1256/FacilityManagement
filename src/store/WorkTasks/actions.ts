import axios from "axios";
import { container } from "tsyringe";

import { AppThunkAction } from "../index";
import { NavigationService } from "../../services/Navigation.Service";
import { WorkTaskScreenName } from "../../screens/WorkTask";
import { WorkTasksScreenName } from "../../screens/WorkTasks";
import { FullWorkTask } from "../WorkTask/reducer";

import { ActionInterfaces, pureActionCreator } from "./actionInterfaces";
import {
    WORK_TASKS_LOADING,
    WORK_TASKS_SUCCESS,
    WORK_TASKS_ERROR,
    COUNT_SUCCESS,
    COUNT_ERROR,
    COUNT_LOADING,
    MOVE_TASK_TO_COMPLETED,
} from "./actionTypes";

export function navigateToWorkTask(workTaskId: string): AppThunkAction<ActionInterfaces> {
    return async () => {
        // Navigate to the work task screen with the param as workTaskId
        const navigationContainer = container.resolve(NavigationService);
        navigationContainer.navigate(WorkTaskScreenName, { workTaskId: workTaskId });
    };
}

export function getCountsAndTasks(isOnlyCount: boolean): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        try {
            if (isOnlyCount) dispatch(pureActionCreator(COUNT_LOADING, {}));
            else {
                dispatch(pureActionCreator(WORK_TASKS_LOADING, {}));
                const navigationContainer = container.resolve(NavigationService);
                navigationContainer.navigate(WorkTasksScreenName, undefined);
            }

            const request1 = axios.get(
                `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/COUNT_P1?countOnly=${isOnlyCount}`,
            );
            const request2 = axios.get(
                `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/COUNT_P2P3?countOnly=${isOnlyCount}`,
            );
            const request3 = axios.get(
                `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/workTaskOverDue?countOnly=${isOnlyCount}`,
            );

            const request4 = axios.get(
                `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/COUNT_DUETODAY?countOnly=${isOnlyCount}`,
            );

            const request5 = axios.get(
                `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/cstWorkTaskCompleted?countOnly=${isOnlyCount}`,
            );

            const [response1, response2, response3, response4, response5] = await Promise.all([
                request1,
                request2,
                request3,
                request4,
                request5,
            ]);

            if (isOnlyCount) {
                if (
                    response1.status === 200 &&
                    response2.status === 200 &&
                    response3.status === 200 &&
                    response4.status === 200 &&
                    response5.status === 200
                ) {
                    dispatch(
                        pureActionCreator(COUNT_SUCCESS, {
                            countP1: response1.data.totalSize,
                            countP2P7: response2.data.totalSize,
                            countOverDue: response3.data.totalSize,
                            countDueToday: response4.data.totalSize,
                            countCompleted: response5.data.totalSize,
                        }),
                    );
                    return;
                }
                dispatch(
                    pureActionCreator(COUNT_ERROR, {
                        error: "Unable to fetch count...",
                    }),
                );
            } else {
                if (
                    response1.status === 200 &&
                    response2.status === 200 &&
                    response3.status === 200 &&
                    response4.status === 200 &&
                    response5.status === 200
                ) {
                    dispatch(
                        pureActionCreator(WORK_TASKS_SUCCESS, {
                            countP1Tasks: response1.data.data,
                            countP2P7Tasks: response2.data.data,
                            countOverDueTasks: response3.data.data,
                            countDueTodayTasks: response4.data.data,
                            countCompletedTasks: response5.data.data,
                        }),
                    );
                    return;
                }
                dispatch(
                    pureActionCreator(WORK_TASKS_ERROR, {
                        error: "Unable to fetch tasks...",
                    }),
                );
            }
        } catch (error) {
            if (isOnlyCount) {
                dispatch(
                    pureActionCreator(COUNT_ERROR, {
                        error: "Something went wrong in fetching count...",
                    }),
                );
            } else {
                dispatch(
                    pureActionCreator(WORK_TASKS_ERROR, {
                        error: "Something went wrong in fetching tasks...",
                    }),
                );
            }
        }
    };
}

export const markWorkTaskAsComplete = (
    workTaskId: string,
    worktask: FullWorkTask,
): AppThunkAction<ActionInterfaces> => {
    return async (dispatch) => {
        dispatch(
            pureActionCreator(MOVE_TASK_TO_COMPLETED, {
                workTask: worktask,
            }),
        );
    };
};
