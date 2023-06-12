import { ActionInterfaces } from "./actionInterfaces";
import { AUTH_LOGIN_START, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR, AUTH_LOGOUT } from "./actionTypes";

export interface AppState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    username: string;
    password: string;
}

const initialState: AppState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    password: "",
    username: "",
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
