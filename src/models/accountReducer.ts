import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:"",
    email: "",
    id_userInfo: "",
    id_role: "",
    role_name:""
}

const AccountReducer = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        accountLogin(state, action) {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.id_userInfo = action.payload.id_userInfo;
            state.id_role = action.payload.id_role;
            state.role_name=action.payload.role_name
        },
        accountLogout(state, action) {
            state._id = initialState._id;
            state.email = initialState.email;
            state.id_role = initialState.id_role;
            state.id_userInfo = initialState.id_userInfo;
            state.role_name = initialState.role_name;
        }
    }
})

export const { accountLogin,accountLogout } = AccountReducer.actions;
export default AccountReducer.reducer
