import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  status: boolean
}

const initialState: NotificationState = {
  status: false
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload
    },
  },
});

export const { updateStatus } = notificationSlice.actions;
export default notificationSlice.reducer;
