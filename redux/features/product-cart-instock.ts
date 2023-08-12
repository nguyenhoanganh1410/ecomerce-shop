import { IProductCart } from "@/utils/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: IProductCart[];
}

const initialState: CartState = {
  items: [],
};

const productsCartInstockSlice = createSlice({
  name: "productsCartInStock",
  initialState,
  reducers: {
    updateProductsCartInStock: (
      state,
      action: PayloadAction<IProductCart[]>
    ) => {
      if (Array.isArray(action.payload)) {
        state.items = [...action.payload];
      }
    },
    addToCartInStock: (state, action: PayloadAction<IProductCart>) => {
      state.items.push(action.payload);
    },
    updateCartItemInStockQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCartInStock: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteCartInStock: (state, action: PayloadAction<IProductCart[]>) => {
      state.items = [];
    },
  },
});

export const {
  updateProductsCartInStock,
  addToCartInStock,
  updateCartItemInStockQuantity,
  removeFromCartInStock,
  deleteCartInStock,
} = productsCartInstockSlice.actions;
export default productsCartInstockSlice.reducer;