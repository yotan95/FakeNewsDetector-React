import axios from 'axios';


export const httpApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-type': 'application/json',
    },
});

httpApi.defaults.withCredentials = true;

httpApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;  // 최신 토큰을 Authorization 헤더에 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.respone.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);