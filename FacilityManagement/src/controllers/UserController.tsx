import { strings } from "../localization";
import { axiosClient } from "../networking";
import { routes } from "../networking/routes";

const userLoginController = (username: any, password: any, demoMode: any) => {
    if (demoMode) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (username && password) {
              resolve({ data: { user: { username } } });
            } else {
              reject({ data: { error: strings.login.invalidCredentials } });
            }
          }, 250);
        });
      }
  
      return axiosClient.request({
        method: 'POST',
        url: routes.authentication.login,
        data: { username, password },
      });
}

const userLogoutController  = (demoMode: any) => {
    if (demoMode) {
        return new Promise((resolve: any) => {
          setTimeout(resolve, 250);
        });
      }
  
    return axiosClient.request({
        method: 'DELETE',
        url: routes.authentication.logout,
    });
}

export { userLoginController , userLogoutController  }