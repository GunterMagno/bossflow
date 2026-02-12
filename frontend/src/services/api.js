// ============================================================
// File: api.js
// Description: Axios instance with interceptors for authentication and error handling.
// ============================================================

import axios from 'axios';

/**
 * Configuration of the base URL for API requests.
 * In development, VITE_API_URL can be used for an absolute URL.
 * In production, relative paths are used so that the proxy (Nginx) handles /api.
 */
const baseURL = import.meta.env.VITE_API_URL || '/api';

/**
 * Axios instance with default configuration.
 */
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add authentication token.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle authentication errors.
 * If the token expires (401), an event is emitted and localStorage is cleared.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data?.error || '';

      if (errorMessage.includes('Invalid token') || errorMessage.includes('expired')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.dispatchEvent(new Event('token-expired'));
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Performs a server health check.
 * @async
 * @returns {Promise<Object>} Server health data.
 * @throws {Error} If the connection to the server fails.
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
