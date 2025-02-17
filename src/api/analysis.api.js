import { httpApi } from "./axios api."

export const getAnalysis = (url) => {
    return httpApi.get(`/analysis?url=${url}`);
}

export const getAnalysisHistory = (page) => {
    return httpApi.get(`/analysis-history?page=${page}`);
}