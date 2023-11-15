import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authRecuder from "./slice/authSlice";
import productReducer from "./slice/productSlice";

const rootReducer = combineReducers({
  auth: authRecuder,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
