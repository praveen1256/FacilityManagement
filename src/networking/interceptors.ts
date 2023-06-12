import { strings } from "../localization";

export const reqInterceptor = {
    onFulfill(request: any) {
        return request;
    },

    onReject(error: any) {
        return Promise.reject(error);
    },
};

export const resInterceptor = {
    onFulfill(response: any) {
        // eslint-disable-next-line no-console
        console.log("Interceptor : ", response.data);
        return response;
    },

    onReject(error: any) {
        if (error.response) {
            // if (response.status === 401) {}
            return Promise.reject(error.response);
        }

        if (error.request) {
            return Promise.reject({ error: strings.common.connectionError });
        }
        return Promise.reject(error);
    },
};
