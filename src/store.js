import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./featuers/user/userSlice";
import cartReducer from "./featuers/cart/CartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
