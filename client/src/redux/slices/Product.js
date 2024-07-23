import { createSlice } from "@reduxjs/toolkit";
import { getAllItems } from "../../operations/products";

const ProductSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        isLoading: false,
        isError: false,
    },

    extraReducers: (builder) => {
        //get all items for admin
        builder.addCase(getAllItems.fulfilled, (state, action) => {
            console.log("get all products", action.payload);
        });
    },
});

export default ProductSlice.reducer;
