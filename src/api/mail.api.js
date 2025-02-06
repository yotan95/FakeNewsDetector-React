import { httpApi } from "./axios api."

export const sendMail = (email) => {
    return httpApi.post('/send-verification-code', email);
}