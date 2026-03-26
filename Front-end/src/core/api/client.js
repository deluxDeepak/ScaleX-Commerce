import axios from "axios";
import { refreshService } from "../../features/auth/authService";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1500,
    withCredentials: true,
});
console.log("url abckend is", import.meta.env.VITE_BASE_URL);


// ✅ REQUEST INTERCEPTOR (token header me set lagega)
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");
        console.log("Token from interceptor", token);
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (do- argument only )
// -- Inceptor me redirect mat karo --redirect route ko karne do 
api.interceptors.response.use(
    // success 
    (response) => {
        return response;
    },

    // Error (Backend error do )---means refresh pe de sakte ho (401-authError)
    async (error) => {
        console.log("Inceptor Error hit", error);
        const originalRequest = error.config;
        console.log("Original request", originalRequest);
        const requestUrl = originalRequest?.url || "";
        const isRefreshRequest = requestUrl.includes("/auth/refresh");

        /*
            _retry: true
            adapter: Array(3) [ "xhr", "http", "fetch" ]
            allowAbsoluteUrls: true
            baseURL: "http://localhost:4000/api"
            data: undefined
        */

        const status = error?.response?.status;
        console.log("Status of Eror from backend", status);

        // Prevent infinite refresh recursion: never try to refresh a failed refresh request.
        if (status === 401 && isRefreshRequest) {
            localStorage.removeItem("token");
            return Promise.reject(new Error("Session expired. Please login again."));
        }

        // If token is expired or particular error ayega tabhi refresh route call karenge
        /*
         if (status === 401 || !originalRequest._retry) 
        - status === 401 to refresh 
        - !originalRequest._retry to refesh 
        - these twoo make infine loop in this 
        */

        if (status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // call the refresh token api 
                console.log("Refresh token api call ");
                const res = await refreshService();
                // Response original backend ka ata hai 
                console.log("Response is ", res);
                // 1.New token nikal ke localStorage me save karna hai 
                const newToken = res.accessToken
                localStorage.setItem("token", newToken);

                // 2.set new token in header
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // 3.retry original request
                // jo bhi request fail ho gya tha osko fir se rquest karo backend ko 
                // nahi to user ko error miliga 
                return api(originalRequest);

            } catch (refreshError) {
                console.log("Refresh Error", refreshError);
                localStorage.removeItem("token");
                // if (window.location.pathname !== "/auth/login") {
                //     window.location.href = "/auth/login";
                // }
                return Promise.reject(refreshError);

            }

        }

        const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong";
        console.log("Message from backend from interceptor", message);
        return Promise.reject(new Error(message));
    }
)

/*
api.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger

        console.log("Hit the intercepter", response);
        // Do something with response data
        return response;
    },
    async function (error) {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        if (error.response?.status === 401) {
            // Call refresh Token 
            await api.get("/auth/refresh");

            return api(error.config);

        }
        // Do something with response error
        return Promise.reject(error);
    },
);

*/


// ========================Interceptors==========================
// Intercepter banate hai yehi 
//1. Request configuration 
//2. Response configuration 

/**
    // Add a request interceptor
        instance.interceptors.request.use(
            function (config) {
                // Do something before the request is sent
                return config;
            },
            function (error) {
                // Do something with the request error
                return Promise.reject(error);
            },
        );

    // Add a response interceptor
        instance.interceptors.response.use(
            function (response) {
                // Any status code that lies within the range of 2xx causes this function to trigger
                // Do something with response data
                return response;
            },
            function (error) {
                // Any status codes that fall outside the range of 2xx cause this function to trigger
                // Do something with response error
                return Promise.reject(error);
            },
        );

 */


const response =
{
    // `data` is the response that was provided by the server
    data: {},

    // `status` is the HTTP status code from the server response
    status: 200,

    // `statusText` is the HTTP status message from the server response
    statusText: 'OK',

    // `headers` the HTTP headers that the server responded with
    // All header names are lowercase and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: {},

    // `config` is the config that was provided to `axios` for the request
    config: {},

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: {}

}
