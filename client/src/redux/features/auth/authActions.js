import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Login Successful!");
        return data;
      }
      return rejectWithValue(data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/auth/current-user");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "User fetch failed");
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", formData);

      if (data.success) {
        toast.success("Registration Successful!");
        return data;
      }

      return rejectWithValue(data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
