import { httpApi } from "./axios api.";

export const getCategory = async () => {
    return await httpApi.get("/category");
}