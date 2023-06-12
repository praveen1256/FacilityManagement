import { container } from "tsyringe";
import { userLogin } from "../../services/FacilityManagementService";
import { ActionInterfaces } from "./actionInterfaces";
import { APP_INITIALIZATION_ERROR, APP_INITIALIZE, APP_INITIALIZED, USER_LOGIN } from "./actionTypes";
import { NavigationService } from "../../services/Navigation.Service";
import { HomeScreenName } from "../../screens/Home";

export interface AppState {
    initializationStarted: boolean;
    isInitialized: boolean;
    initializationError: unknown;
}

const initialState: AppState = {
    initializationError: null,
    initializationStarted: false,
    isInitialized: false,
};

export const appReducer = (state: AppState = initialState, action: ActionInterfaces): AppState => {
    switch (action.type) {
        case APP_INITIALIZE:
            return {
                ...state,
                initializationStarted: true,
            };
        case APP_INITIALIZED:
            return {
                ...state,
                isInitialized: true,
                initializationError: null,
            };
        case APP_INITIALIZATION_ERROR:
            return {
                ...state,
                isInitialized: false,
                initializationError: action.error,
            };
        case USER_LOGIN:
            let promiseObjectLogin = userLogin(action.payload.user_name, action.payload.user_password);
            // return { ...state, action.promiseResponse };
            const navigationContainer = container.resolve(NavigationService);
            navigationContainer.navigate(HomeScreenName,undefined);
            return { ...state };
        default:
            return {
                ...state,
                initializationError: null,
            };
    }
};
