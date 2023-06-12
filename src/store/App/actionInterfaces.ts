import { APP_INITIALIZED, APP_INITIALIZATION_ERROR, APP_INITIALIZE, USER_LOGIN } from "./actionTypes";

export interface AppInitialize {
    type: typeof APP_INITIALIZE;
}

export interface AppInitialized {
    type: typeof APP_INITIALIZED;
}

export interface AppInitializationError {
    type: typeof APP_INITIALIZATION_ERROR;
    error: unknown;
}

export interface UserLogin {
    type: typeof USER_LOGIN;
    user_name: string,
    user_password: string,
    payload: any,
}

export type ActionInterfaces = AppInitialize | AppInitialized | AppInitializationError | UserLogin;
