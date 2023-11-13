import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authRecuder from "./slice/authSlice";

const rootReducer = combineReducers({
  auth: authRecuder,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
