import axios from 'axios';


const API_BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:8080" // 로컬 환경
        : "http://43.203.195.193:8080"; // 배포된 Spring 서버


export const httpApi = axios.create({
    baseURL: API_BASE_URL,
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