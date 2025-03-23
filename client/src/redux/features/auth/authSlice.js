import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

const initialState = {
    loading: false,
    user: null,
    token: localStorage.getItem("token") || null,  // ✅ Persist token
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");  // ✅ Remove token on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
                localStorage.setItem("token", payload.token);  // ✅ Store token
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
                localStorage.setItem("token", payload.token);  // ✅ Store token
            })
            .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");  // ✅ Clear on unauthorized
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
