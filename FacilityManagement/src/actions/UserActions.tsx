import { userLoginController, userLogoutController } from '../controllers/UserController';
import { strings } from '../localization/Localization';
import { setAccessToken } from '../networking';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = (user: any) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginError = (error: any) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const loginAction = (username: string, password: string) => 
    async (dispatch: any, demoMode: any) => {
        try {
            dispatch(loginRequest());
            const data:any  = await userLoginController (username, password, demoMode );
            console.log("Data : ", data)
            if (!demoMode) {
                setAccessToken(data.user.accessToken);
            }
            dispatch(loginSuccess(data.user));
        }   catch (data: any) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
};

export function logoutAction () {
    async(dispatch: any, demoMode: any) => {
        try {
            dispatch(loginRequest());
            await userLogoutController (demoMode );
        }   finally {
            dispatch(clearStore());
        }
    }
}
