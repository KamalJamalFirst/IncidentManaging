import { createSlice } from "@reduxjs/toolkit";

interface modalCancelledState {
    value: boolean;
}

const initialState: modalCancelledState = {
    value: false
};

const modalCancelledSlice = createSlice({
    name: "canceled",
    initialState,
    reducers: {
        changeStateCancelled: (state) => {
            state.value = !state.value;
        }
    }
});

export const { changeStateCancelled } = modalCancelledSlice.actions;

export default modalCancelledSlice.reducer;