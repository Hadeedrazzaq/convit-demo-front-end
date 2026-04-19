import api from './api';

export const placeOrder = (payload) => api.post('/orders', payload).then((r) => r.data);
export const getMyOrders = () => api.get('/orders/mine').then((r) => r.data);
export const getOrderById = (id) => api.get(`/orders/${id}`).then((r) => r.data);
export const listAllOrders = (params = {}) =>
  api.get('/orders', { params }).then((r) => r.data);
export const markDelivered = (id) => api.put(`/orders/${id}/deliver`).then((r) => r.data);
