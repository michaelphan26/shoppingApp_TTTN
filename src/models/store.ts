import { combineReducers, configureStore} from "@reduxjs/toolkit";
import AccountReducer from "./accountReducer";
import logger from 'redux-logger';

const store = configureStore({
    reducer: combineReducers({
        accountReducer: AccountReducer,
        
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
    .concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export default store