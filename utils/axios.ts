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
    console.log("axios func");
    let originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("inside retry");
      try {
        console.log("inside try");
        await api
          .get("/auth/refresh")
          .then((res) => {
            console.log(res.data, "inside try: in axios file");
            // ✅ Redirect to dashboard
            if (
              typeof window !== "undefined" &&
              publicRoutes.includes(window.location.pathname)
            ) {
              api(originalRequest); // 🔁 retry original request
              window.location.href = "/dashboard";
            }
          })
          .catch((err) => {
            console.log(err, "catch: in axios file");
            if (
              typeof window !== "undefined" &&
              !publicRoutes.includes(window.location.pathname)
            ) {
              window.location.href = "/login";
            }
          });
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
