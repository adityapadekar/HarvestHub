import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsEndPoints } from "./apis";


const {GET_ALL_PRODUCTS}=ProductsEndPoints;
const token = JSON.parse(localStorage.getItem("token"));


const getAllItems = createAsyncThunk("getAllProducts", async () => {  // for admin get all items
    const response = await fetch(GET_ALL_PRODUCTS, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    return response.json();
});


export {getAllItems};