import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../Features/BoardsSlice";


export const Store = configureStore({
  reducer:{
    boards:boardReducer
  }
})