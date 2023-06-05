import {ActionInterfaces} from './actionInterfaces';
import {
  APP_INITIALIZATION_ERROR,
  APP_INITIALIZE,
  APP_INITIALIZED,
} from './actionTypes';

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

export const appReducer = (
  state: AppState = initialState,
  action: ActionInterfaces,
): AppState => {
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
    default:
      return {
        ...state,
        initializationError: null,
      };
  }
};
