import { httpApi } from "./axios api."

export const postAnalysis = (url) => {
    return httpApi.get(`/analysis?url=${url}`);
}