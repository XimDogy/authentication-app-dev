import axios from 'axios';

const API  =  axios.create({ baseURL: 'http://localhost:5000'});
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const register =  (email, password) => API.post(`/user/register`, { email, password }); 
export const login =  (email, password) => API.post(`/user/login`, { email, password });
export const googleAuth = (data) => API.post(`/user/googleAuth`, { data });
export const getUserInfo = (userId) => API.get(`/user/${userId}`);
export const edit =  (userId, userInfo) => API.post(`/user/edit/${userId}`, userInfo);