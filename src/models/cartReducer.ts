import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "../common/util/common";
import { api_url } from "../common/util/constant";

const CartReducer = createSlice({
    name: 'cart',
    reducers: {
        addToCart(state, action) {
            const addItem = action.payload.cartItem
            const existedItem=state.productList.find((cartItem: CartItem) => cartItem.id_product === addItem.id_product)
            if (existedItem=== undefined) {
                state.productList.push(addItem);
                state.total=state.total+(addItem.price - (addItem.price*addItem.discount/100))
            }
            else {
                existedItem.quantity = existedItem.quantity + 1
                state.total=state.total+(addItem.price - (addItem.price*addItem.discount/100))
            }

            const token = action.payload.token
            if (token !== null) {
                console.log("Push API")
                axios({
                url: `/receipt/add-receipt`,
                baseURL: `${api_url}`,
                method: 'post',
                headers: {
                    "x-auth-token":token
                    },
                    responseType: 'json',
                    data: { state}
                }).catch(err => {
                    console.log(err.response.data['message'])
                })
            }
            
        },
        loadCart(state, action) {
            state=action.payload
        }
    },
    initialState: {
        productList: [] as any,
        total: 0,
    }
})

export const { addToCart, loadCart } = CartReducer.actions;

export default CartReducer.reducer