import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Get the base URL from environment variables
const GENOVA_BASE_URL = import.meta.env.VITE_GENOVA_BASE_API_URL || 'https://loyaltyapis.loyaltyinsurancegh.com';

// Create axios instance with default configuration
const genovaAPI: AxiosInstance = axios.create({
  baseURL: GENOVA_BASE_URL + "/genova",
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding authentication or logging
genovaAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any authentication headers here if needed
    // For example: config.headers.Authorization = `Bearer ${token}`;
    
    // Log request for debugging (remove in production)
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      data: config.data,
      params: config.params,
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
genovaAPI.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful response for debugging (remove in production)
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });
    
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      console.error(`❌ API Error Response: ${error.response.status}`, {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        data: error.response.data,
        message: error.message,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ API Network Error:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        message: 'No response received from server',
      });
    } else {
      // Something else happened
      console.error('❌ API Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default genovaAPI;