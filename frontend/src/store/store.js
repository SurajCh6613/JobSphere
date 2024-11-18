import {configureStore} from "@reduxjs/toolkit"
import jobReducer from "./slices/jobSlice"
import userReducer from "./slices/userSlice"
const store  = configureStore({
    reducer:{
        user:userReducer,
        jobs:jobReducer,
    },
})

export default store;