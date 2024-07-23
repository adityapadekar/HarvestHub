import { createAsyncThunk } from "@reduxjs/toolkit";

import { AdminEndPoints } from "./apis";

const {
    ADD_PRODUCT_ADMIN,
    ADD_MARKET_ADMIN,
    ADD_MODERATOR_ADMIN,
} = AdminEndPoints;




const token = JSON.parse(localStorage.getItem("token"));



// add product
const addProductAdmin = createAsyncThunk("addProductAdmin", async (payload) => {
    const formData = new FormData();
    formData.append("productName", payload.productName);
    formData.append("productType", payload.productType);
    formData.append("unit", payload.unit);
    formData.append("image", payload.image);
    

    const response = await fetch(ADD_PRODUCT_ADMIN, {
        method: "POST",
        headers: {
            "authorization": `Bearer ${token}`,
        },
        body:formData ,
    });

    return response.json();
});

//create market
const addMarketAdmin = createAsyncThunk("addMarketAdmin", async (payload) => {
    // marketName, address, contactNumber, latitude, longitude,image
    const response = await fetch(ADD_MARKET_ADMIN, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            payload,
        }),
    });

    return response.json();
});

//create moderator
const addModeratorAdmin = createAsyncThunk(
    "addModeratorAdmin",
    async (payload) => {
       
        console.log("create moderator payload", payload);
        const response = await fetch(ADD_MODERATOR_ADMIN, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                payload,
            }),
        });

        return response.json();
    });



export { addProductAdmin, addMarketAdmin, addModeratorAdmin };
