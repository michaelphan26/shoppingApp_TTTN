import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
            state.email = action.payload.email;
            state.id_userInfo = action.payload.id_userInfo;
            state.id_role = action.payload.id_role;
            state.role_name=action.payload.role_name
        },
        accountLogout(state, action) {
            state = initialState;
        }
    }
})

export const { accountLogin } = AccountReducer.actions;
export default AccountReducer.reducer
