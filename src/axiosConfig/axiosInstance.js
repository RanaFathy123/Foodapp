import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1",
});

let protectedAxiosInstace = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1",
});

protectedAxiosInstace.interceptors.request.use((config) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  config.headers.Authorization = token;
  return config;
});
export { axiosInstance, protectedAxiosInstace };
