import axios from "axios";
import localUser from "./localUser";

const Http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

// Add a request interceptor
Http.interceptors.request.use(
  function (config) {
    const token = localUser.getToken();

    if ((token ?? "").length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      localUser.remove();
      window.location.href = "/";
      throw new Error("failed authentication");
    }

    return Promise.reject(error);
  }
);

export default Http;
