import { APP_INITIALIZED, APP_INITIALIZATION_ERROR, APP_INITIALIZE } from "./actionTypes";

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

export type ActionInterfaces = AppInitialize | AppInitialized | AppInitializationError;
