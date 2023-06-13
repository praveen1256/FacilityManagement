import axios from "axios";
import { container } from "tsyringe";

import { AppThunkAction } from "../index";
import { NavigationService } from "../../services/Navigation.Service";
import { HomeScreenName } from "../../screens/Home";

import { ActionInterfaces, pureActionCreator } from "./actionInterfaces";
import { WORK_TASKS_LOADING, WORK_TASKS_SUCCESS, WORK_TASKS_ERROR } from "./actionTypes";

export function workTasksAndCount(isOnlyCount: boolean): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        // get the username and password,
        dispatch(pureActionCreator(WORK_TASKS_LOADING, {}));
        // let the store know we are checking the crentials, by dispatching loading state
        try {
            // call the api to check the credentials
            // TODO: need to move this api to a function!!!
            const url = `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/COUNT_P2P3?countOnly=${isOnlyCount}`;
            const response = await axios.get(url);
            // console.log("Response workTasksAndCount : ", response.data);
            // if the credentials are correct, dispatch the success state
            if (response.status === 200) {
                dispatch(
                    pureActionCreator(WORK_TASKS_SUCCESS, {
                        tasks: response.data,
                    }),
                );

                const navigationContainer = container.resolve(NavigationService);
                navigationContainer.navigate(HomeScreenName, undefined);
                return;
            }

            dispatch(
                pureActionCreator(WORK_TASKS_ERROR, {
                    error: "Invalid credentials", // Unknown error
                }),
            );
        } catch (error) {
            // if the credentials are incorrect, dispatch the error state
            dispatch(
                pureActionCreator(WORK_TASKS_ERROR, {
                    error: "Invalid credentials",
                }),
            );
        }
    };
}
