import axios from "axios";
import store from "../redux/store"; // Import Redux Store
import { logout } from "../redux/features/auth/authSlice";

// Base URL (Uses Environment Variable or Fallback)
const API = axios.create({
    baseURL: process.env.REACT_APP_BASEURL || "http://localhost:3000/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Attach Token Automatically Before Every Request
API.interceptors.request.use(
    (req) => {
        const token = store.getState().auth.token; // Get token from Redux store
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => Promise.reject(error)
);

// ✅ Handle Expired Token or Unauthorized Access
API.interceptors.response.use(
    (response) => response, // If response is successful, return it.
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Logging out...");

            // Dispatch Logout Action
            store.dispatch(logout());

            // Redirect to login without page reload
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default API;
