import { createSlice } from "@reduxjs/toolkit";

const AccountReducer = createSlice({
    name: "account",
    initialState: {
        email: "",
        id_userInfo: "",
        id_role: "",
        role_name:""
    },
    reducers: {
        accountLogin(state, action) {
            state.email = action.payload.email;
            state.id_userInfo = action.payload.id_userInfo;
            state.id_role = action.payload.id_role;
            state.role_name=action.payload.role_name
        }
    }
})

export const { accountLogin } = AccountReducer.actions;
export default AccountReducer.reducer
