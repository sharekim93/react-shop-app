import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authRecuder from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";

const rootReducer = combineReducers({
  auth: authRecuder,
  product: productReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
