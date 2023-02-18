import axios from "axios";

console.log(process.env);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default api;
