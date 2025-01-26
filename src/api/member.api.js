import { httpApi } from './axios api.';

export const signupApi = (signup) => {
    return httpApi.post('/signup', signup);
};

export const loginApi = (login) => {
    return httpApi.post('/login', login);
}

export const getProfile = () => {
    return httpApi.get('/profile', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
}