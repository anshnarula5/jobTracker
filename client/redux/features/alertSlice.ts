import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Alert {
  message: string;
  type: string;
}

interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    createAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },
  },
});

export const { createAlert } = alertSlice.actions;

export default alertSlice.reducer;
