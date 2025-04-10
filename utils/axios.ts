// utils/axios.ts
import axios from "axios";

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
        const refreshRes: {
          data: {
            authStatus: string;
            accessToken: string;
            message: string;
          };
        } = await api.get("/auth/refresh");
        console.log(refreshRes);
        if (
          refreshRes.data.authStatus === "authenticated" &&
          typeof window !== "undefined"
        ) {
          window.location.href = "/dashboard";
        }
        if (
          refreshRes.data.authStatus === "unauthenticated" &&
          typeof window !== "undefined"
        ) {
          window.location.href = "/login";
        }
        api(originalRequest); // 🔁 retry original request
        return;
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        // ✅ Redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
