import { createSlice } from "@reduxjs/toolkit";




const FruitSlice = createSlice({
    name: "fruit",
    initialState: {
        allFruits: [],
        isLoading: false,
        isError: false,
    },
    
    extraReducers: (builder) => {
      
    },
});

export default FruitSlice.reducer;
