import axios from 'axios';


const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080" // 로컬 환경
    : "http://3.34.253.76:8080"; // 배포된 Spring 서버

export const httpApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    },
});