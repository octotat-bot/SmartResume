import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'https://smart-resume-backend-five.vercel.app/api';

// Remove trailing slash if present
API_URL = API_URL.replace(/\/$/, '');

// Fix common misconfiguration where user pastes the health endpoint
if (API_URL.endsWith('/health')) {
    API_URL = API_URL.replace(/\/health$/, '');
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
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

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
