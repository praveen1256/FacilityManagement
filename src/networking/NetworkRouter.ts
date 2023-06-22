import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

interface IRequest extends AxiosRequestConfig {
    url: string;
    method: Method;
    retriedRequest?: boolean;
}

/**
 * This class is used to define all the network requests in the app.
 * It is a singleton class, so it can be accessed from anywhere in the app.
 *
 * To use this class, you can do:
 * NetworkRouter.getInstance()
 *
 * Once the instance is obtained, you need to call login in order to allow other apis to work.
 *
 * Example:
 * const networkRouter = NetworkRouter.getInstance();
 * const loginResponse = await networkRouter.login(email, password);
 */
class NetworkRouter {
    // Static variables to get instance
    private static instance: NetworkRouter;
    public static getInstance(): NetworkRouter {
        if (!NetworkRouter.instance) {
            NetworkRouter.instance = new NetworkRouter();
        }
        return NetworkRouter.instance;
    }

    readonly POST: Method = "post";
    readonly GET: Method = "get";
    readonly PUT: Method = "put";
    readonly DELETE: Method = "DELETE";

    // private variables
    private username: string;
    private password: string;

    // Private constructor to prevent direct creation of object
    private constructor() {
        this.username = "1446144475";
        this.password = "password";
    }

    // Login api is crucial to the app, so we need to define it here
    public async login(email: string, password: string) {
        try {
            await axios.get(
                `https://verizon-dev2.tririga.com/oslc/login?USERNAME=${this.username}&PASSWORD=${this.password}`,
            );
            this.username = email;
            this.password = password;
            return true;
        } catch (error) {
            throw error;
        }
    }

    // A method to call protected api
    public async protectedRequest<T = unknown>(params: IRequest): Promise<T> {
        try {
            const response = await axios.request<T>({
                ...params,
            });

            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            if (params.retriedRequest) {
                throw error;
            }

            if (err.response?.status === 401) {
                // console.log("Cookie is not set, trying to login again");
                // seems like the cookie is not set, so we need to login again
                await this.login(this.username, this.password);

                return await this.protectedRequest({
                    ...params,
                    retriedRequest: true,
                });
            }
            throw error;
        }
    }

    // // Define a test api, which has to see if the error is 401, if it is, then call login again and then retry the api
    // public async testApi() {
    //     try {
    //         const response = await this.protectedRequest<{
    //             data: any;
    //         }>({
    //             url: "https://verizon-dev2.tririga.com/p/webapi/rest/v2/cstServiceRequestT/-1/LoggedInUser?countOnly=false",
    //             method: this.GET,
    //         });

    //         return response.data;
    //     } catch (error) {
    //         console.log("Error in test api", error);
    //     }
    // }
}

export default NetworkRouter;
