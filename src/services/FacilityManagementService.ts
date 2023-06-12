import { axiosClient } from "../networking";
import { routes } from "../networking/routes";

let userLogin = (username:string, password: string) => {
    let loginPromiseObject = axiosClient.request({
        method: 'GET',
        url: routes.authentication.login,
        data: { username, password },
      });
    return loginPromiseObject;
}

export { userLogin };