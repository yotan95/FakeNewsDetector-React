import { httpApi } from "./axios api."

export const paymentComplete = (requestPayment) => {
    return httpApi.post('/payment/complete', requestPayment);
}