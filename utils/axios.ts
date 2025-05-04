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

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    let originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api
          .get("/auth/refresh")
          .then((res) => {
            // ✅ Redirect to dashboard
            if (
              typeof window !== "undefined" 
              // &&
              // publicRoutes.includes(window.location.pathname)
            ) {
              api(originalRequest); // 🔁 retry original request
              window.location.href = "/dashboard";
            }
          })
          .catch((err) => {
            // if (
            //   typeof window !== "undefined" &&
            //   !publicRoutes.includes(window.location.pathname)
            // ) {
            //   window.location.href = "/login";
            // }
          });
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;