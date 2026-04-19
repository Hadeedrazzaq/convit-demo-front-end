import api from './api';

export const signup = (payload) => api.post('/users/signup', payload).then((r) => r.data);
export const login = (payload) => api.post('/users/login', payload).then((r) => r.data);
export const getProfile = () => api.get('/users/profile').then((r) => r.data);
