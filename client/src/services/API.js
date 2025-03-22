import axios from "axios";

// Base URL (Uses Environment Variable or Fallback)
const API = axios.create({
    baseURL: process.env.REACT_APP_BASEURL || "http://localhost:3000/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Attach Token Automatically Before Every Request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

// ✅ Handle Expired Token or Unauthorized Access
API.interceptors.response.use(
    (response) => response, // If response is successful, return it.
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn("Unauthorized! Logging out...");
                localStorage.removeItem("token"); // Clear token on unauthorized
                window.location.replace("/login"); // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
);

export default API;
