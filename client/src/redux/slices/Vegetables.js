import { createSlice } from "@reduxjs/toolkit";



const VegetableSlice = createSlice({
    name: "vegetable",
    initialState: {
        allVegetables: [],
        isLoading: false,
        isError: false,
    },
    
    extraReducers: (builder) => {
       
    },
});

export default VegetableSlice.reducer;
