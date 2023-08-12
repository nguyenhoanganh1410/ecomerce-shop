import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
}
export interface CartItem {
  id: number;
  email?: string
  idProduct: string;
  idSubProduct: string;
  quantity: number;
  giftSigma?: string;
  giftUserId?: string;
  idWishListOfGift?: string;
  giftEmail?: string;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      if(Array.isArray(action.payload)) {
        state.items = [...action.payload];
      }
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
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
  },
});

export const { addToCart, removeFromCart, updateCart, updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
