import { configureStore } from "@reduxjs/toolkit";
import completedReducer from "./modalCompletedSlice"
import cancelledReducer from "./modalCancelledSlice"
import newIncidentReducer from "./modalNewIncidentSlice"


export const store = configureStore({
    reducer: {
        completed: completedReducer,
        cancelled: cancelledReducer,
        newIncident: newIncidentReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;