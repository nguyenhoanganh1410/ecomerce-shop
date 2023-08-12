import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenCardState {
  token: string
}

const initialState: TokenCardState = {
  token: ""
};

const tokenCardSlice = createSlice({
  name: "tokenCard",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
});

export const { updateToken } = tokenCardSlice.actions;
export default tokenCardSlice.reducer;