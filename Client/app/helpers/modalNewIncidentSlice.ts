import { createSlice } from "@reduxjs/toolkit";

interface modalNewIncidentState {
    value: boolean;
}

const initialState: modalNewIncidentState = {
    value: false
};

const modalNewIncidentSlice = createSlice({
    name: "newIncident",
    initialState,
    reducers: {
        changeNewIncidentState: (state) => {
            state.value = !state.value;
        }
    }
});

export const { changeNewIncidentState } = modalNewIncidentSlice.actions;

export default modalNewIncidentSlice.reducer;