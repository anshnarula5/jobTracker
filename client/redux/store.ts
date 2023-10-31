import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"
import alertSlice from "./features/alertSlice"

export const store = configureStore({
    reducer : {
        authReducer,
        notifications: alertSlice
    }
})  

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch
