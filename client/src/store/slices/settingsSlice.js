import { createSlice } from "@reduxjs/toolkit";

export const toastColorMap = {
    info: "text-blue-500 border-blue-300",
    success: "text-green-500 border-green-300",
    error: "text-red-500 border-red-300",
    warning: "text-yellow-500 border-yellow-300",
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        toast: {
            show: false,
            message: "",
            icon: "fas fa-info-circle",
            type: "info",
        }
    },
    reducers: {
        updateToastState: (state, { payload }) => {
            console.log(payload)
            state.toast = { ...state.toast, ...payload };
        }
    }
});

export const { updateToastState } = settingsSlice.actions;

export default settingsSlice.reducer;