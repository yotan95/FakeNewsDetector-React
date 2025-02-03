import { httpApi } from "./axios api."

export const postComment = (commentData) => {
    return httpApi.post('/comment', commentData);
}