import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OpenFilterMobileState {
  status: boolean;
}

const initialState: OpenFilterMobileState = {
  status: false,
};

const filterMobileSlice = createSlice({
  name: "openMobile",
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { updateStatus } = filterMobileSlice.actions;
export default filterMobileSlice.reducer;
