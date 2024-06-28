import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import authAdminReducer from './authAdminSlice'; // Corrected import name for better clarity

// Configure the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer,
        authAdmin: authAdminReducer 
    }
});

export default store;
