import { createSlice } from "@reduxjs/toolkit";
import {
    
    addProductAdmin,
    addMarketAdmin,
    addModeratorAdmin,
} from "../../operations/admin";
import { toast } from "react-toastify";

const adminSlice = createSlice({
    name: "admin",
    initialState: "",
    reducers: {},
    extraReducers: (builder) => {
       
        builder.addCase(addProductAdmin.fulfilled, (state, action) => {
            console.log("after create product", action.payload);
        });

        builder.addCase(addMarketAdmin.fulfilled, (state, action) => {});

        builder.addCase(addModeratorAdmin.fulfilled, (state, action) => {});
    },
});

export default adminSlice.reducer;
