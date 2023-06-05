import { AppInitialized, AppInitializationError, AppInitialize } from "./actionInterfaces";
import { APP_INITIALIZED, APP_INITIALIZATION_ERROR, APP_INITIALIZE } from "./actionTypes";

export function appInitializeAction(): AppInitialize {
    return { type: APP_INITIALIZE };
}

export function appInitializedAction(): AppInitialized {
    return { type: APP_INITIALIZED };
}

export function appInitializationErrorAction(error: unknown): AppInitializationError {
    return { type: APP_INITIALIZATION_ERROR, error };
}
