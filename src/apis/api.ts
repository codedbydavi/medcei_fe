import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh", {}, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token falhou, apenas limpar auth context");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;