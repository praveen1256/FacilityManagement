import axios, { AxiosRequestConfig, Method } from "axios";

interface IRequest extends AxiosRequestConfig {
    url?: string;
    method: Method;
}

/**This class will be responsible for all the network calls
 * In this class we will store the Authorization Tokens so every subsequent call will have the token automatically
 */
class Router {
    private headers: Record<string, string> = {};
    private queryParameters: Record<string, string> = {};

    // private constructor() {}

    /**
     * For tririga we can pass base64 encoded username:pass as the token with "Basic" as the bearer type
     */
    public setAuthorizationToken(token: string, bearerType = "Bearer"): boolean {
        // Set the Authorization Token
        this.headers["Authorization"] = `${bearerType} ${token}`;
        return true;
    }

    public setQueryParameters(queryParameters: Record<string, string>): boolean {
        this.queryParameters = {
            ...this.queryParameters,
            ...queryParameters,
        };

        return true;
    }

    public async request<T>(params: IRequest) {
        try {
            // Add in all the headers and query parameters

            const response = await axios.request<T>({
                ...params,
                headers: {
                    ...this.headers,
                    ...(params?.headers || {}),
                },
            });

            return response.data;
        } catch (error) {
            // Handle this gracefully so we dont need to handle it in every request
            throw error;
        }
    }
}

export default Router;
