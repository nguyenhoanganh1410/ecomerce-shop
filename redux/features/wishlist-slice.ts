import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  items: IWishList[];
}
export interface IWishList {
  id: number;
  uid: string;
  idProduct: string;
  idSubProduct: string;
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateWishlist: (state, action: PayloadAction<IWishList[]>) => {
      if(Array.isArray(action.payload)) {
        state.items = [...action.payload];
      }
    },
    addToWishlist: (state, action: PayloadAction<IWishList>) => {
      state.items.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, updateWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
