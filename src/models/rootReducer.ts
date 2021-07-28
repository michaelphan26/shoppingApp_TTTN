import { combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./cartReducer";
import AccountReducer from "./accountReducer";

const Reducers = combineReducers({
    accountReducer: AccountReducer,
    cartReducer: CartReducer
})

export default Reducers