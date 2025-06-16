import { createSlice } from "@reduxjs/toolkit";
import { Memory } from "../../utilities/memory";

const auth = Memory.get("auth");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: auth?.user || null,
        token: auth?.token || null,
    },
    reducers: {
        login: (state, { payload }) => { // { token, user }
            state.user = payload.user;
            state.token = payload.token;

            Memory.set("auth", { ...payload });
        }, 
        logout: (state) => {
            state.user = null;
            state.token = null;

            Memory.remove("auth");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;