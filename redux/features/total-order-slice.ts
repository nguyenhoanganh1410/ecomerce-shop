import { IProductCart } from "@/utils/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  total: number;
}

const initialState: CartState = {
  total: -1,
};

const totalOrderSlice = createSlice({
  name: "totalOrder",
  initialState,
  reducers: {
    updateTotals: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
  },
});

export const { updateTotals } = totalOrderSlice.actions;
export default totalOrderSlice.reducer;
