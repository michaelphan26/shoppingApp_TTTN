import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addReceiptAPI, CartItem } from "../common/util/common";
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
        },
        loadCart(state, action) {
            if (Object.keys(action.payload).length !== 0) {
                state.productList = action.payload.productList;
                state.total=action.payload.total
            }
            
        },
        changeQuantity(state, action) {
            const cartItem = action.payload.item;
            const newQuantity = action.payload.newQuantity;
            for (const index in state.productList) {
                if (state.productList[index].id_product === cartItem.id_product) {
                    if (parseInt(state.productList[index].quantity) > parseInt(newQuantity)) {
                        const change = parseInt(state.productList[index].quantity) - parseInt(newQuantity);
                        const totalChange = change * parseInt(state.productList[index].price);
                        state.total = state.total - totalChange;
                        state.productList[index].quantity = newQuantity;

                        if (state.productList[index].quantity === 0) {
                            state.productList.splice(index,1)
                        }
                    }
                    else if (parseInt(state.productList[index].quantity) < parseInt(newQuantity)) {
                        const change = parseInt(newQuantity) - parseInt(state.productList[index].quantity);
                        const totalChange = change * parseInt(state.productList[index].price);
                        state.total = state.total + totalChange;
                        state.productList[index].quantity = newQuantity;
                    }
                }
            }
            
        },
        removeFromCart(state, action) {
            state.productList=state.productList.filter((item:CartItem)=>item.id_product!==action.payload.id_product)
            state.total = state.total - (parseInt(action.payload.quantity) * parseInt(action.payload.price))
        },
        emptyCart(state, action) {
            state.productList = [] as any;
            state.total = 0;
        }
    },
    initialState: {
        productList: [] as any,
        total: 0,
    }
})

export const { addToCart, loadCart, changeQuantity,removeFromCart,emptyCart } = CartReducer.actions;

export default CartReducer.reducer