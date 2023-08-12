import { IProductCart } from "@/utils/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: IProductCart[];
}

const initialState: CartState = {
  items: [],
};

const productsCartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<IProductCart[]>) => {
      if(Array.isArray(action.payload)) {
        state.items = [...action.payload];
      }
    },
    addToCart: (state, action: PayloadAction<IProductCart>) => {
      state.items.push(action.payload);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteCart: (state, action: PayloadAction<IProductCart[]>) => {
      state.items = []
    },
  },
});

export const { addToCart, removeFromCart, updateProducts, updateCartItemQuantity, deleteCart } = productsCartSlice.actions;
export default productsCartSlice.reducer;
