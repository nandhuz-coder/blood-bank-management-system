import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

const initialState = {
    loading: false,
    user: null,
    token: null,
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(userRegister.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(getCurrentUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                if (payload?.status === 401) {
                    state.user = null;
                    state.token = null;
                }
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
