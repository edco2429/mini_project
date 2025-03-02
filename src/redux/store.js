import { configureStore } from "@reduxjs/toolkit";
// import { userSlice } from "./slices/userSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
