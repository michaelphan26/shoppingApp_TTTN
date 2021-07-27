import { combineReducers, configureStore} from "@reduxjs/toolkit";
import AccountReducer from "./accountReducer";
import logger from 'redux-logger';


const Reducers = combineReducers({
    accountReducer:AccountReducer
})

const store = configureStore({
    reducer: Reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
    .concat(logger)
})

export type RootState = ReturnType<typeof store.getState>

export default store