import axios from "axios";
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
        try {
            // call the api to check the credentials
            // TODO: need to move this api to a function!!!
            const url = `https://verizon-dev2.tririga.com/oslc/login?USERNAME=${username}&PASSWORD=${password}`;
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
            dispatch(
                pureActionCreator(AUTH_LOGIN_ERROR, {
                    error: "Invalid credentials",
                }),
            );
        }
    };
}
