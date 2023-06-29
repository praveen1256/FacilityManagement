import { ActionInterfaces } from "./actionInterfaces";
import {
    AUTH_LOGIN_START,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGOUT,
    AUTH_LOGIN_USER_START,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_ERROR,
} from "./actionTypes";

export interface AppState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    username: string;
    password: string;
    loginUserName: string;
    role: string;
}

const initialState: AppState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    password: "",
    username: "",
    loginUserName: "",
    role: "",
};

export const authReducer = (state: AppState = initialState, action: ActionInterfaces): AppState => {
    switch (action.type) {
        case AUTH_LOGIN_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                username: action.username,
                password: action.password,
            };
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case AUTH_LOGIN_USER_START:
            return {
                ...state,
                error: "",
            };
        case AUTH_LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginUserName: action.loginUserName,
                role: action.role,
            };
        case AUTH_LOGIN_USER_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case AUTH_LOGOUT:
            return {
                ...initialState,
            };
        default:
            return {
                ...state,
            };
    }
};
