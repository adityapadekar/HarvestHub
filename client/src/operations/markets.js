import { createAsyncThunk } from "@reduxjs/toolkit";
import { MarketEndPoints } from "./apis";

const { GET_ALL_MARKETS } = MarketEndPoints;

const token = JSON.parse(localStorage.getItem("token"));

// get all markets
const getAllMarkets = createAsyncThunk("getAllMarkets", async () => {
        
    const response = await fetch(
        `${GET_ALL_MARKETS}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        },
    );

    return response.json();
});

export { getAllMarkets };
