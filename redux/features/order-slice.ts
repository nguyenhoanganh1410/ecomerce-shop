import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  items: IOrder | null;
}

interface IContract {
  email: string;
  phone: string;
}

interface IAddress {
  id?: number,
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

export interface IBilling {
  id?: number,
  cardNumber?: string,
  expiresOn?: string,
  securityCode?: string,
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

export interface ICheckDefault {
  isDefaultAddress: boolean,
  isDefaultBilling: boolean,
  shippingAsBilling: boolean
}

export interface IOrder {
  address?: IAddress;
  billing: IBilling;
  contract: IContract;
  check: ICheckDefault
}

const initialState: OrderState = {
  items: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<IOrder>) => {
      state.items = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.items = null;
    },
  },
});

export const { updateOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;