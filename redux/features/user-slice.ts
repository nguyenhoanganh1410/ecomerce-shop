import { Iuser } from '@/utils/type';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  user: Iuser[]
}

const initialState: userState = {
  user: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Iuser[]>) => {
      state.user = action.payload
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
