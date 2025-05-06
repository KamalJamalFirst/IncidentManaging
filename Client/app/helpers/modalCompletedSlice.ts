import { createSlice } from "@reduxjs/toolkit";

interface modalCompletedState {
    value: boolean;
}

const initialState: modalCompletedState = {
    value: false
};

const modalCompletedSlice = createSlice({
    name: "completed",
    initialState,
    reducers: {
        changeStateCompleted: (state) => {
            state.value = !state.value;
        }
    }
});

export const { changeStateCompleted } = modalCompletedSlice.actions;

export default modalCompletedSlice.reducer;