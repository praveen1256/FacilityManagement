// import {container} from 'tsyringe';

// import {OnboardingInitial} from '../../Screen/OnboardingInitial';
// import {NavigationService} from '../../Services';
import { AppThunkAction } from "../index";

import { appInitializedAction, appInitializeAction, appInitializationErrorAction } from "./actionCreators";
import { ActionInterfaces } from "./actionInterfaces";

export function appInitializate(): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        dispatch(appInitializeAction());
    };
}

export function appInitialized(): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        dispatch(appInitializedAction());
    };
}

export function appInitializationError(error: unknown): AppThunkAction<ActionInterfaces> {
    return async (dispatch) => {
        dispatch(appInitializationErrorAction(error));
    };
}
