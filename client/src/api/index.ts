import axios from 'axios';

// Base configuration for Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:5174/', // Adjust base URL as needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding authorization token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      localStorage.removeItem('authToken');
      window.location.href = '/login'; // Redirect to login page
    }
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
