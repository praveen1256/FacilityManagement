import axios from "axios";
import { baseURL, headers } from "./config";
import { reqInterceptor, resInterceptor } from "../networking/interceptors";

const axiosClient = axios.create({
    baseURL :   baseURL,
    headers :   headers
})

axiosClient.interceptors.request.
    use(reqInterceptor.onFulfill, reqInterceptor.onReject);

axiosClient.interceptors.response.
    use(resInterceptor.onFulfill, resInterceptor.onReject);

const setAccessToken = (token:any) => {
    axiosClient.defaults.headers.common.authorization = `Bearer ${token}`;
}
    
const clearAccessToken = () => {
    delete axiosClient.defaults.headers.common.authorization;
}


export { axiosClient, setAccessToken, clearAccessToken };