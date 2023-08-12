import { IProductWishList } from "@/utils/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  items: IProductWishList[];
}

const initialState: WishlistState = {
  items: [],
};

const productsWishlistSlice = createSlice({
  name: "productsWishlist",
  initialState,
  reducers: {
    updateProductsWishList: (state, action: PayloadAction<IProductWishList[]>) => {
      if(Array.isArray(action.payload)) {
        state.items = [...action.payload];
      }
    },
    addToWishlist: (state, action: PayloadAction<IProductWishList>) => {
      state.items.push(action.payload);
    },
    deleteCart: (state, action: PayloadAction<IProductWishList[]>) => {
      state.items = []
    },
  },
});

export const { addToWishlist, updateProductsWishList, deleteCart } = productsWishlistSlice.actions;
export default productsWishlistSlice.reducer;
