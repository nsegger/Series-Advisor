import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export const authApi = {
    authenticate: async (formContent) => {
        return await api.post('/user/auth', formContent);
    },

    register: async (formContent) => {
        return await api.post('/user/register', formContent);
    }
};