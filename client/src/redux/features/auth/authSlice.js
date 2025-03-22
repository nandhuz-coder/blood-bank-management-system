import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

const token = localStorage.getItem("token") || null;
const initialState = {
    loading: false,
    user: null,
    token,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token"); // ✅ Clear token on logout
        },
    },
    extraReducers: (builder) => {
        // ✅ Handle Login
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
            localStorage.setItem("token", payload.token); // ✅ Save token
        });

        // ✅ Handle Register
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
            localStorage.setItem("token", payload.token); // ✅ Save token after registration
        });
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });

        // ✅ Handle Fetch Current User
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload?.status === 401) {
                state.user = null;
                state.token = null;
                localStorage.removeItem("token"); // ✅ Auto logout on 401
            }
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
