// utils/axios.ts
import axios from "axios";
const publicRoutes = ["/login", "/signup"];
const BACKEND_URL =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? process.env.NEXT_PUBLIC_BACKEND_URL_DEV
    : process.env.NEXT_PUBLIC_BACKEND_URL_PROD;

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add any request modifications here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is due to an expired token (usually 401) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Call the refresh endpoint
        const refreshResponse = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true } // This will include cookies
        );
        
        // If refresh was successful, retry the original request
        if (refreshResponse.status === 200) {
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token is also invalid, redirect to login
        if (typeof window !== 'undefined') {
          // Clear session storage
          sessionStorage.removeItem('session');
          
          // Redirect to login and save the attempted URL
          const currentPath = window.location.pathname;
          window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
