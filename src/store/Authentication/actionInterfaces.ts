import {
    AUTH_LOGIN_START,
    AUTH_LOGOUT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_USER_START,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_ERROR,
} from "./actionTypes";

export interface AuthLogin {
    type: typeof AUTH_LOGIN_START;
}

export interface AuthLoginSuccess {
    type: typeof AUTH_LOGIN_SUCCESS;
    username: string;
    password: string;
}

export interface AuthLoginError {
    type: typeof AUTH_LOGIN_ERROR;
    error: string;
}

export interface AuthLogout {
    type: typeof AUTH_LOGOUT;
}

export interface AuthLoginUser {
    type: typeof AUTH_LOGIN_USER_START;
}

export interface AuthLoginUserSuccess {
    type: typeof AUTH_LOGIN_USER_SUCCESS;
    loginUserName: string;
    role: string;
}

export interface AuthLoginUserError {
    type: typeof AUTH_LOGIN_USER_ERROR;
    error: string;
}

export type ActionInterfaces =
    | AuthLogin
    | AuthLogout
    | AuthLoginSuccess
    | AuthLoginError
    | AuthLoginUser
    | AuthLoginUserSuccess
    | AuthLoginUserError;

export const pureActionCreator = <T extends ActionInterfaces["type"]>(
    type: T,
    options: Omit<Extract<ActionInterfaces, { type: T }>, "type">,
) => ({
    type,
    ...options,
});
