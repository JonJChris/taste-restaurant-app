import { configureStore } from "@reduxjs/toolkit";
import staticDataSlice from "./slices/staticDataSlice";
import userDataSlice from "./slices/userDataSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore(
    {
        reducer : {
         staticData : staticDataSlice.reducer,
         userData: userDataSlice.reducer,
         cartData : cartSlice.reducer
        }
    }
);

export default store;