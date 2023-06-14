import axios, { AxiosError } from "axios";
import { container } from "tsyringe";

import { AppThunkAction } from "../index";
import { NavigationService } from "../../services/Navigation.Service";
import { HomeScreenName } from "../../screens/Home";

import { ActionInterfaces, pureActionCreator } from "./actionInterfaces";
import { AUTH_LOGIN_START, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS } from "./actionTypes";

export function login(username: string, password: string): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        // get the username and password,
        dispatch(pureActionCreator(AUTH_LOGIN_START, {}));
        // let the store know we are checking the crentials, by dispatching loading state
        const url = `https://verizon-dev2.tririga.com/oslc/login?USERNAME=${username}&PASSWORD=${password}`;
        try {
            const response = await axios.get(url);
            // if the credentials are correct, dispatch the success state
            if (response.status === 200) {
                dispatch(
                    pureActionCreator(AUTH_LOGIN_SUCCESS, {
                        username,
                        password,
                    }),
                );
                const navigationContainer = container.resolve(NavigationService);
                navigationContainer.navigate(HomeScreenName, undefined);
                return;
            }

            dispatch(
                pureActionCreator(AUTH_LOGIN_ERROR, {
                    error: "Invalid credentials", // Unknown error
                }),
            );
        } catch (error) {
            // if the credentials are incorrect, dispatch the error state
            console.log("url : ", url);
            console.log(error);
            const err = error as AxiosError;

            if (err.code === "Unauthorized") {
                dispatch(
                    pureActionCreator(AUTH_LOGIN_ERROR, {
                        error: "Invalid credentials", // Invalid credentials
                    }),
                );
                return;
            }
            dispatch(
                pureActionCreator(AUTH_LOGIN_ERROR, {
                    error: err.message || "Something went wrong",
                }),
            );
        }
    };
}
