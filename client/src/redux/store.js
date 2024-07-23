import { configureStore } from "@reduxjs/toolkit";
import fruitReducer from "./slices/Fruits";
import authReducer from "./slices/auth";
import VegetableReducer from "./slices/Vegetables";
import ProductReducer from "./slices/Product";
import adminReducer from "./slices/admin";
import marketReducer from "./slices/Market";
import moderatorReducer from "./slices/moderator";
export const store = configureStore({
    reducer: {
        fruit: fruitReducer,
        user:authReducer,
        vegetable:VegetableReducer,
        products:ProductReducer,
        market:marketReducer,
        admin:adminReducer,
        moderator:moderatorReducer
    },
});
