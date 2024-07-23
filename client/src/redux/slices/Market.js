import { createSlice } from "@reduxjs/toolkit";
import { getAllMarkets } from "../../operations/markets";
import { toast } from "react-toastify";

const MarketSlice = createSlice({
    name: "market",
    initialState: {
        allMarkets: [],
        isLoading: false,
        isError: false,
    },

    extraReducers: (builder) => {
        builder.addCase(getAllMarkets.fulfilled, (state, action) => {
            if (action.payload.success) {
                toast.success("Markets Fetched Successfully");
                state.allMarkets = action?.payload?.result;
            } else toast.error(action.payload.message);
        });
    },
});

export default MarketSlice.reducer;
