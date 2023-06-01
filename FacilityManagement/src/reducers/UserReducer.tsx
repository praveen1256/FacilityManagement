import { TYPES } from "../actions/UserActions";

const userInitialState = {
    data: [],
};

export const userReducer = (state = userInitialState, action: any) => {
    switch (action.type) {
      case TYPES.LOGIN_SUCCESS:
        return { ...state, ...action.payload.user };
      case TYPES.CLEAR_STORE:
        return {};
      default:
        return state;
    }
};
