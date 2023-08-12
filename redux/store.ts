import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./features/cart-slice";
import notificationReducer from "./features/notification-slice";
import productsCartReducer from "./features/product-cart-slice"
import userReducer from "./features/user-slice"
import totalReducer from "./features/total-order-slice"
import productsCartInStockReducer from "./features/product-cart-instock"
import orderReducer from "./features/order-slice"
import tokenReducer from "./features/token-card-slice"
import wishlistReducer from "./features/wishlist-slice"
import productsInwishlistReducer from "./features/product-wishlist-slice"
import filterMobileReducer from "./features/filter-mobile"

interface RootState {
  cart: ReturnType<typeof cartReducer>;
  notification: ReturnType<typeof notificationReducer>;
  productsCart: ReturnType<typeof productsCartReducer>;
  user: ReturnType<typeof userReducer>;
  totalOrder: ReturnType<typeof totalReducer>;
  productsCartInStock: ReturnType<typeof productsCartInStockReducer>;
  order: ReturnType<typeof orderReducer>;
  tokenCard: ReturnType<typeof tokenReducer>;
  wishlist: ReturnType<typeof wishlistReducer>;
  productsInwishlist:  ReturnType<typeof productsInwishlistReducer>;
  filterMobile:  ReturnType<typeof filterMobileReducer>;
}

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    cart: cartReducer,
    productsCart: productsCartReducer,
    user: userReducer,
    totalOrder: totalReducer,
    productsCartInStock: productsCartInStockReducer,
    order: orderReducer,
    tokenCard: tokenReducer,
    wishlist: wishlistReducer,
    productsInwishlist: productsInwishlistReducer,
    filterMobile: filterMobileReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
