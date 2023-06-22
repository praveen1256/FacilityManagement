import axios, { AxiosError } from "axios";
import { container } from "tsyringe";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppThunkAction, Authentication } from "../index";
import { NavigationService } from "../../services/Navigation.Service";
import { HomeScreenName } from "../../screens/Home";
import { LoginScreen } from "../../screens";

import { ActionInterfaces, pureActionCreator } from "./actionInterfaces";
import { AUTH_LOGIN_START, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

export function initializeAuthentication(): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        // get the username and password, try to login
        const username = await AsyncStorage.getItem("username");
        const password = await AsyncStorage.getItem("password");

        if (username && password) {
            dispatch(login(username, password, true));
            return;
        }

        const navigationContainer = container.resolve(NavigationService);
        navigationContainer.navigate(LoginScreen.LoginScreenName, undefined);

        return;
    };
}

export function login(
    username: string,
    password: string,
    isInitialization?: boolean,
): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        // get the username and password,
        dispatch(pureActionCreator(AUTH_LOGIN_START, {}));
        const navigationContainer = container.resolve(NavigationService);

        // let the store know we are checking the crentials, by dispatching loading state
        const url = `https://verizon-dev2.tririga.com/oslc/login?USERNAME=${username}&PASSWORD=${password}`;
        try {
            const response = await axios.get(url);
            // if the credentials are correct, dispatch the success state
            if (response.status === 200) {
                // TODO: Save the username and password in the a secure storage
                await AsyncStorage.setItem("username", username);
                await AsyncStorage.setItem("password", password);

                // dispatch(
                //     pureActionCreator(AUTH_LOGIN_SUCCESS, {
                //         username,
                //         password,
                //     }),
                // );
                dispatch(Authentication.Actions.loggedInUser(username, password, false));

                navigationContainer.navigate(HomeScreenName, undefined);
                return;
            }

            dispatch(
                pureActionCreator(AUTH_LOGIN_ERROR, {
                    error: "Invalid credentials", // Unknown error
                }),
            );
        } catch (error) {
            // check for current screen, if it is not login, then do not dispatch the error state, just navigate to login
            if (isInitialization) {
                // erase the username and password
                await AsyncStorage.removeItem("username");
                await AsyncStorage.removeItem("password");
                dispatch(
                    pureActionCreator(AUTH_LOGIN_ERROR, {
                        error: "You have been logged out, please login again",
                    }),
                );
                navigationContainer.navigate(LoginScreen.LoginScreenName, undefined);
                return;
            }

            // if the credentials are incorrect, dispatch the error state
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

export function loggedInUser(username: string, password: string, countOnly: boolean): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        dispatch(pureActionCreator(AUTH_LOGIN_START, {}));
        // let the store know we are checking the crentials, by dispatching loading state
        const url = `https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/LoggedInUser?countOnly=${countOnly}`;
        try {
            const response = await axios.get(url);
            // if the user data reterived, dispatch the success state
            if (response.status === 200) {
                const loginUserName = response.data.data[0].Name;
                const role = response.data.data[0].FMRole;
                console.log("role ", role);
                // Restricting to login only Technician
                if (role == "Technician") {
                    dispatch(
                        pureActionCreator(AUTH_LOGIN_SUCCESS, {
                            username,
                            password,
                            loginUserName,
                            role,
                        }),
                    );
                    const navigationContainer = container.resolve(NavigationService);
                    navigationContainer.navigate(HomeScreenName, loginUserName);
                } else {
                    dispatch(
                        pureActionCreator(AUTH_LOGIN_ERROR, {
                            error: "Not Technician", // LoggedIn User is Not technician
                        }),
                    );
                }
                return;
            }

            dispatch(
                pureActionCreator(AUTH_LOGIN_ERROR, {
                    error: "Something Went Wrong", // Unknown error
                }),
            );
        } catch (error) {
            const err = error as AxiosError;

            if (err.code === "Unauthorized") {
                dispatch(
                    pureActionCreator(AUTH_LOGIN_ERROR, {
                        error: "Retry Login", // Retry Login
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

export function logout(): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        try {
            await AsyncStorage.clear();
            console.log("Storage cleared successfully.");
        } catch (error) {
            console.log("Error clearing storage:", error);
        }
        dispatch(pureActionCreator(AUTH_LOGOUT, {}));
        const navigationContainer = container.resolve(NavigationService);
        navigationContainer.navigate(LoginScreen.LoginScreenName, "");
    };
}
