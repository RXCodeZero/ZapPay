// src/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3001",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
    config.headers["tkn"] = token;  // IMPORTANT: matches backend check
    }
    return config;
});

export default API;
